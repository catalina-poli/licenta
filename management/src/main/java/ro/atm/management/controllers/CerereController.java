package ro.atm.management.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.DtoCerereAndFlowsICanSee;
import ro.atm.management.dto.DtoCerereDetailedWithUsers;
import ro.atm.management.dto.DtoCerereWithUsers;
import ro.atm.management.dto.UserCerere;
import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDetailed;
import ro.atm.management.model.CerereType;
import ro.atm.management.model.FlowCerere;
import ro.atm.management.model.Group;
import ro.atm.management.model.Message;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoCerereDetailed;
import ro.atm.management.repo.RepoCerereType;
import ro.atm.management.repo.RepoFlowCerere;
import ro.atm.management.repo.RepoGroup;
import ro.atm.management.repo.RepoMessage;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController
@RequestMapping("/rest/cerere")
public class CerereController {

	@Autowired
	private RepoCerere repoCerere;

	@Autowired
	private RepoUser repoUser;

	@Autowired
	private RepoGroup repoGroup;

	@Autowired
	private RepoFlowCerere repoFlow;

	@Autowired
	private RepoCerereType repoCerereType;

	@Autowired
	private RepoCerereDetailed repoCerereDetailed;

	@Autowired
	private RepoMessage repoMessage;

	@GetMapping("/all")
	public List<Cerere> allCereri(Principal principal) {
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		boolean admin = false;
		for (Role role : userLogat.getUserRoles()) {
			if (role.getRoleName().equals("ADMIN")) {
				admin = true;
				break;
			}
		}
		if (admin) {
			return repoCerere.findAllByOrderByDateCreatedDesc();
		}
		return repoCerere.findAllByUserAssociatedOrderByDateCreatedDesc(userLogat);
	}

//	@GetMapping("/all-paginated/{page}/{size}/{sort}/{order}")
//	public Page<Anunt> allUsersPaginated(@PathVariable("page") int page, @PathVariable("size") int size, @PathVariable("sort") String sort, @PathVariable("order") String order){
//		
//		Pageable pageCurrent = PageRequest.of(page, size , order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
//		Page<Anunt> messages = repoAnuntPagination.findAll(pageCurrent);
//		return messages;
//	}

	@GetMapping("/all-paginated/{type}/{page}/{size}/{sort}/{order}")
	public Page<Cerere> allCereriPaginated(Principal principal, @PathVariable("type") String type,
			@PathVariable("page") int page, @PathVariable("size") int size, @PathVariable("sort") String sort,
			@PathVariable("order") String order) {
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		boolean admin = false;
		Pageable pageCurrent = PageRequest.of(page, size,
				order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());

		for (Role role : userLogat.getUserRoles()) {
			if (role.getRoleName().equals("ADMIN")) {
				admin = true;
				break;
			}
		}
		System.out.println("******PAGE CERERI******");
		System.out.println("TYPE: " + type);
		if (type.equals("all")) {
			if (admin) {
				return repoCerere.findAllByOrderByDateCreatedDesc(pageCurrent);
			}
			return repoCerere.findAllByUserAssociatedOrderByDateCreatedDesc(pageCurrent, userLogat);
		} else {
			if (admin) {
				return repoCerere.findAllByTypeCerereOrderByDateCreatedDesc(pageCurrent, type);
			}
			return repoCerere.findAllByTypeCerereAndUserAssociatedOrderByDateCreatedDesc(pageCurrent, type, userLogat);
		}
	}

	@GetMapping("/by-id/{idCerere}")
	public Cerere getCerereDupaId(@PathVariable("idCerere") int id) {
		return repoCerere.findById(id).get();
	}

	@GetMapping("/by-user/{idUser}")
	public List<Cerere> getDupaUser(@PathVariable("idUser") int idUser) {

		User userAsociat = repoUser.findById(idUser).get(); // SELECT * FROM users where id = <idUser>;
		return this.repoCerere.findByUserAssociated(userAsociat);

//		List<Cerere> cereri = new ArrayList<>();
//		for(Cerere c : this.repoCerere.findAll()) { // SELECT * FROM cereri ----> SELECT * FROM cereri where id_user = .//
//			if(c.getUserAssociated().getId() == idUser) {
//				cereri.add(c);
//			}
//		}
//		return cereri;
	}

	@GetMapping("/all-restanta")
	public List<Cerere> getRestante() {
		return this.repoCerere.findByTypeCerere("restanta");
	}

	private void saveCerereFlowForCerereAndUserStatus2Pending(Cerere cerereSalvata,
			CerereDetailed cerereDetailedSalvata, User userInCharge, int priority) {
		FlowCerere flow = new FlowCerere();
		flow.setCerere(cerereSalvata);
		flow.setCerereDetailed(cerereDetailedSalvata);
		flow.setMotiv(null);
		flow.setStatus(2); // 2 - INCOMPLETE / PENDING
		flow.setCanInterrupt(1);
		flow.setPriority(priority);
		flow.setSuperior(userInCharge);

		Message message = new Message();
		message.setContents("New cerere added");
		message.setDatePosted(new Date());
		message.setMessageType("system");
		message.setReceiver(userInCharge);

		this.repoMessage.save(message);

		this.repoFlow.save(flow);

	}

	// TODO: should delete one of the following two methods:
	// ??????
	@PostMapping("/save-with-users-cerere-detailed")
	public CerereDetailed saveCerereWithUsersCerereDetailed(@RequestBody DtoCerereDetailedWithUsers cerereNouaDto,
			Principal principal) {

		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		CerereDetailed cerereNouaDetailed = cerereNouaDto.getCerereDetailed();
		cerereNouaDetailed.setDateCreated(new Date());
		cerereNouaDetailed.setUser(userLogat);
		CerereDetailed saved = this.repoCerereDetailed.save(cerereNouaDetailed);
		for (UserCerere uc : cerereNouaDto.getUsersSelected()) {
			FlowCerere flowCerere = new FlowCerere();
			flowCerere.setCerereDetailed(saved);
			flowCerere.setStatus(2); // PENDING
			flowCerere.setSuperior(this.repoUser.findById(uc.getId()).get());
			flowCerere.setCanInterrupt(uc.getCanInterrupt());
			flowCerere.setPriority(cerereNouaDto.getUsersSelected().indexOf(uc));
			this.repoFlow.save(flowCerere);
		}
		return saved;
	}

	@PostMapping("/save-with-users/{type}")
	public Cerere saveCerereWithUsers(@RequestBody DtoCerereWithUsers cerereNouaDto, Principal principal,
			@PathVariable("type") String type) {

		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		Cerere cerereNoua = null;
		if (cerereNouaDto.getCerere() != null) {
			cerereNoua = cerereNouaDto.getCerere();
			cerereNoua.setUserAssociated(userLogat);
			cerereNoua.setDateCreated(new Date());
			CerereType cerereType = this.repoCerereType.findByTypeCerere(cerereNoua.getTypeCerere());
			cerereNoua.setCerereType(cerereType);

		}

		CerereDetailed cerereDetailed = null;
		if (cerereNouaDto.getCerereDetailed() != null) {
			cerereDetailed = cerereNouaDto.getCerereDetailed();
			cerereDetailed.setUser(userLogat);
			cerereDetailed.setDateCreated(new Date());
		}

		Cerere cerereSalvata = null;
		if (cerereNoua != null) {
			cerereSalvata = this.repoCerere.save(cerereNoua);
		}

		CerereDetailed cerereDetailedSalvata = null;
		if (cerereDetailed != null) {
			cerereDetailedSalvata = this.repoCerereDetailed.save(cerereDetailed);

		}
		if (type.equals("SPECIFIC_USERS")) {
			for (UserCerere uc : cerereNouaDto.getUsersSelected()) {
				FlowCerere flowCerere = new FlowCerere();
				flowCerere.setCerere(cerereSalvata);
				flowCerere.setCerereDetailed(cerereDetailed);
				flowCerere.setStatus(2); // PENDING
				flowCerere.setSuperior(this.repoUser.findById(uc.getId()).get());
				flowCerere.setCanInterrupt(uc.getCanInterrupt());
				flowCerere.setPriority(cerereNouaDto.getUsersSelected().indexOf(uc));
				this.repoFlow.save(flowCerere);
			}
		} else if (type.equals("DEFAULT_FLOW_USERS")) {
			this.saveCerereAndAssociateWithDefaultGroupUsers(cerereNoua, cerereDetailed, principal);
		}

		System.out.println("SAVING CERERE: " + cerereNouaDto);
		return cerereSalvata;
	}

	// @Deprecated
	// @PostMapping("/save")
	private Cerere saveCerereAndAssociateWithDefaultGroupUsers(Cerere cerereSalvata, CerereDetailed cerereDetailed,
			Principal principal) {
		System.out.println("PRINCIPAL: " + principal.getName());
//		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
//		cerereNoua.setUserAssociated(userLogat);
//		cerereNoua.setDateCreated(new Date());

//		CerereType cerereType = this.repoCerereType.findByTypeCerere(cerereNoua.getTypeCerere());
//		cerereNoua.setCerereType(cerereType);

//		Cerere cerereSalvata = this.repoCerere.save(cerereNoua);
		// cand o noua cerere este inregistrata, in flow vor fi salvate cererile de
		// aprobare a cerii,
		// urmand ca acestea sa fie aprobate ulterior
		List<Group> groupsCerere = this.getGroupsForCerere(cerereSalvata.getId());
		Set<User> usersAlreadyAssociated = new HashSet<>();
		int priority = 0;
		for (Group g : groupsCerere) {
			User userInCharge = g.getUserInCharge();

			if (userInCharge != null) {
				if (!usersAlreadyAssociated.contains(userInCharge)) {
					this.saveCerereFlowForCerereAndUserStatus2Pending(cerereSalvata, cerereDetailed, userInCharge,
							priority++);
					usersAlreadyAssociated.add(userInCharge);
				}

			}
			if (g.getParentGroup() != null) {
				if (g.getParentGroup().getUserInCharge() != null) {
					if (!usersAlreadyAssociated.contains(g.getParentGroup().getUserInCharge())) {
						this.saveCerereFlowForCerereAndUserStatus2Pending(cerereSalvata, cerereDetailed,
								g.getParentGroup().getUserInCharge(), priority++);
						usersAlreadyAssociated.add(g.getParentGroup().getUserInCharge());
					}
				}
			}

		}
		return cerereSalvata;
	}

	@GetMapping("/flow/to-be-seen-by-me")
	public List<DtoCerereAndFlowsICanSee> myFlowCereriToBeSeenByMe(Principal principal) {
		System.out.println("PRINCIPAL: " + principal.getName());
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		List<FlowCerere> flowCereriICanSee = this.myFlowCereri(principal);
		List<DtoCerereAndFlowsICanSee> result = new ArrayList<>();
		for (FlowCerere flowCerereICanSee : flowCereriICanSee) {
			DtoCerereAndFlowsICanSee dto = new DtoCerereAndFlowsICanSee();
			dto.setCerere(flowCerereICanSee.getCerere());
			dto.setCerereDetailed(flowCerereICanSee.getCerereDetailed());

			if (dto.getCerere() != null) {
				dto.setFlowItemsICanSeeForCerere(this.repoFlow.findByCerere(flowCerereICanSee.getCerere()));

			} else if (dto.getCerereDetailed() != null) {
				dto.setFlowItemsICanSeeForCerere(
						this.repoFlow.findByCerereDetailed(flowCerereICanSee.getCerereDetailed()));

			}
			result.add(dto);
		}

		return result;
	}

	@GetMapping("/flow/accept-refuse/by-me")
	public List<FlowCerere> myFlowCereri(Principal principal) {
		System.out.println("PRINCIPAL: " + principal.getName());
		User userLogat = this.repoUser.findByEmail(principal.getName()).get();
		List<FlowCerere> myFlowItems = this.repoFlow.findBySuperior(userLogat);
		List<FlowCerere> myFlowItemsWithPriority = new ArrayList<>();
		for (FlowCerere fc : myFlowItems) {
			// 1. cererea
			Cerere cerereAsociataDocument = fc.getCerere();
			CerereDetailed cerereAsociataDetailed = fc.getCerereDetailed();
			// 2. celelalte elemente de flow to check priority
			List<FlowCerere> toateFlowCerereDocument = this.repoFlow.findByCerere(cerereAsociataDocument);
			List<FlowCerere> toateFlowCerereDetailed = this.repoFlow.findByCerereDetailed(cerereAsociataDetailed);

			boolean canAddToListDocument = true;
			boolean canAddToListDetailed = true;
			for (FlowCerere fcElement : toateFlowCerereDocument) {
				if (fcElement.getStatus() == 2 && fcElement.getPriority() < fc.getPriority()) {
					// daca exista un flow cu ordinea mai mica decat flow-ul curent care este
					// PENDING - nu ar trebui sa vedem flow item-ul
					canAddToListDocument = false;
					break;
				}
				if (fcElement.getStatus() == 0 && fcElement.getPriority() < fc.getPriority()
						&& fcElement.getCanInterrupt() == 1) {
					// cineva a dat reject unui flow item, cineva care putea sa "intrerupa"
					canAddToListDocument = false;
					break;
				}
			}
			for (FlowCerere fcElement : toateFlowCerereDetailed) {
				if (fcElement.getStatus() == 2 && fcElement.getPriority() < fc.getPriority()) {
					// daca exista un flow cu ordinea mai mica decat flow-ul curent care este
					// PENDING - nu ar trebui sa vedem flow item-ul
					canAddToListDetailed = false;
					break;
				}
				if (fcElement.getStatus() == 0 && fcElement.getPriority() < fc.getPriority()
						&& fcElement.getCanInterrupt() == 1) {
					// cineva a dat reject unui flow item, cineva care putea sa "intrerupa"
					canAddToListDetailed = false;
					break;
				}
			}
			if (canAddToListDocument || canAddToListDetailed) {
				myFlowItemsWithPriority.add(fc);
			}
		}
		return myFlowItemsWithPriority;
	}

	@GetMapping("/get-groups-for-cerere/{idCerere}")
	public List<Group> getGroupsForCerere(@PathVariable("idCerere") int idCerere) {
		List<Group> rezultat = new ArrayList<>();
		Cerere cerere = this.repoCerere.findById(idCerere).get();
		System.out.println("CERERE GASITA: " + cerere);
		User userAsociat = cerere.getUserAssociated();
		System.out.println("USER ASOCIAT: " + userAsociat);
		Iterable<Group> allGroups = this.repoGroup.findAll();
		for (Group g : allGroups) {
			System.out.println("\t\tSTUDENTI IN GRUP: " + g.getStudents());
			if (g.getStudents().contains(userAsociat)) {
				rezultat.add(g);
			}
		}
//		rezultat = this.repoGroup.findAllByStudents(userAsociat);
		return rezultat;
	}

}
