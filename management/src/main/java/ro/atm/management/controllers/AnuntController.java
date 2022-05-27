package ro.atm.management.controllers;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import ro.atm.management.dto.DtoAddAnunt;
import ro.atm.management.model.Anunt;
import ro.atm.management.model.Group;
import ro.atm.management.model.Role;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoAnunt;
import ro.atm.management.repo.RepoAnuntPagination;
import ro.atm.management.repo.RepoGroup;
import ro.atm.management.repo.RepoUser;
import ro.atm.management.service.AnuntService;
import ro.atm.management.service.UserService;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController // clasa care trimite date catre frontend
@RequestMapping("/rest/anunturi") // url-ul controller-ului http://localhost:8080/rest/anunturi
public class AnuntController {

	@Autowired
	private RepoAnunt repoAnunt;

//	private RepoAnunt repoAnunt2 = new RepoAnunt();

	@Autowired 
	private RepoAnuntPagination repoAnuntPagination;
	
	@Autowired
	private AnuntService anuntService;
	
	@Autowired
	private RepoUser repoUser;
	
	@Autowired
	private RepoGroup repoGroup;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/all") // url-ul de la care putem lua toate anunturile
	public Iterable<Anunt> getAllAnunturi() /*throws InterruptedException*/ {
		//Thread.sleep(6000);
		return repoAnunt.findAll();
	}
	@GetMapping("/all-paginated/{page}/{size}/{sort}/{order}")
	public Page<Anunt> allUsersPaginated(@PathVariable("page") int page, @PathVariable("size") int size, @PathVariable("sort") String sort, @PathVariable("order") String order){
		
		Pageable pageCurrent = PageRequest.of(page, size , order.equals("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());
		Page<Anunt> messages = repoAnuntPagination.findAll(pageCurrent);
		return messages;
	}

	private byte[] generatePdfInFilesystem(Anunt anunt) throws FileNotFoundException, IOException {
		Document document = new Document();
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {

//			PdfWriter.getInstance(document, new FileOutputStream(new File("C:/dev/temp/test.pdf")));
			
			 PdfWriter.getInstance(document, byteArrayOutputStream); 
			// open
			document.open();

			Paragraph p = new Paragraph();
			p.add(anunt.getTitlu());
			p.setAlignment(Element.ALIGN_CENTER);

			document.add(p);

			Paragraph p2 = new Paragraph();
			p2.add(anunt.getContinut()); // no alignment

			document.add(p2);

			Font f = new Font();
			f.setStyle(Font.BOLD);
			f.setSize(8);

			document.add(new Paragraph("This is my paragraph 3", f));

			// close
			document.close();

			System.out.println("Done");

		} catch (DocumentException e) {
			e.printStackTrace();
		}
		byte[] pdfBytes = byteArrayOutputStream.toByteArray();
		return pdfBytes;

	}

	@GetMapping("/generate-anunt-pdf/{id}")
	public ResponseEntity<byte[]> generatePdf(@PathVariable("id") int id) throws InterruptedException, FileNotFoundException, IOException {
		Optional<Anunt> anuntCautatOptional = repoAnunt.findById(id);
		if (anuntCautatOptional.isPresent()) {
			// 
			byte[] fisierBytes = this.generatePdfInFilesystem(anuntCautatOptional.get());

			  HttpHeaders headers = new HttpHeaders();
			    headers.setContentType(MediaType.APPLICATION_PDF);
			    // Here you have to set the actual filename of your pdf
			    String filename = anuntCautatOptional.get().getTitlu()+".pdf";
			    headers.setContentDispositionFormData(filename, filename);
			    headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			    ResponseEntity<byte[]> response = new ResponseEntity<>(fisierBytes, headers, HttpStatus.OK);
			
			return response;
		}
		return null;
	}

	@GetMapping("/select-by-id/{id}")
	public Anunt selectById(@PathVariable("id") int id) throws InterruptedException {

		// simulez un long time operation pe server
//		Thread.sleep(3000);

//		Anunt anuntCautat = repoAnunt.findById(id).get();

		Optional<Anunt> anuntCautatOptional = repoAnunt.findById(id);
		if (anuntCautatOptional.isPresent()) {
			return anuntCautatOptional.get();
		}
		return null;

	}
	
	@PostMapping("/associate-groups-with-anunt/{idAnunt}")
	public Anunt associateWithGroups(@PathVariable("idAnunt") int idAnunt, @RequestBody List<Integer> groupIds) {
		
		Anunt anunt = this.repoAnunt.findById(idAnunt).get();
		Iterable<Group> allGroupsForAnunt = this.repoGroup.findAllById(groupIds);
		
		Set<User> userDestinari = new HashSet<>();
		for(Group g : allGroupsForAnunt) {
			userDestinari.addAll(g.getStudents());
		}
		
		for(User user: userDestinari) {
			user.getAnunturi().add(anunt);
			
		}
		
		this.repoUser.saveAll(userDestinari);
		return anunt;
	}
	
	@PostMapping("/associate-users-with-anunt/{idAnunt}")
	public Anunt associateWithUsers(@PathVariable("idAnunt") int idAnunt, @RequestBody List<Integer> userIds) {
		
		Anunt anunt = this.repoAnunt.findById(idAnunt).get();
		Iterable<User> allUsersForAnunt = this.repoUser.findAllById(userIds);
		for(User user: allUsersForAnunt) {
			user.getAnunturi().add(anunt);
			
		}
		this.repoUser.saveAll(allUsersForAnunt);
		return anunt;
	}

	// fara file
	@PostMapping("/save")
	public Anunt saveAnunt(@RequestBody DtoAddAnunt anuntNou) {
		// TODO: send to ALL students
//		this.anuntService.saveNotificationMessage(0, "Un nou anunt");
		
		// TODO: check acum cui trebuie sa trimitem notificare (ID-urile user-ilor din dto!!!)
		this.anuntService.saveNotificationMessageBulkCategory("Un nou anunt", Role.RoleTypes.STUDENT);
		
		Anunt anunt = anuntNou.getAnunt();
		List<Integer> userIds = anuntNou.getIds();
		
		System.out.println("SAVING TO IDS: " + userIds);
		Anunt anuntSaved = repoAnunt.save(anunt);
		Iterable<User> destinatari = this.repoUser.findAllById(userIds);
		for(User user : destinatari) {
			user.getAnunturi().add(anuntSaved);
			repoUser.save(user);
		}
		return anuntSaved;
	}
	
	@PostMapping("/save-with-groups")
	public Anunt saveAnuntWithGroups(@RequestBody DtoAddAnunt anuntNou) {
		// TODO: send to ALL students
//		this.anuntService.saveNotificationMessage(0, "Un nou anunt");
		
		// TODO: check acum cui trebuie sa trimitem notificare (ID-urile user-ilor din dto!!!)
		this.anuntService.saveNotificationMessageBulkCategory("Un nou anunt", Role.RoleTypes.STUDENT);
		
		Anunt anunt = anuntNou.getAnunt();
		List<Integer> groupIds = anuntNou.getIds();
		
		System.out.println("SAVING TO IDS: " + groupIds);
		Anunt anuntSaved = repoAnunt.save(anunt);
		Iterable<Group> grupuriDestinatare = this.repoGroup.findAllById(groupIds);
		Set<User> useriDestinatari = new HashSet<>();
		for(Group g : grupuriDestinatare) {
			useriDestinatari.addAll(g.getStudents());
		}
		
		for(User user : useriDestinatari) {
			user.getAnunturi().add(anuntSaved);
			repoUser.save(user);
		}
		return anuntSaved;
	}

	@PutMapping("/update")
	public Anunt updateAnunt(@RequestBody Anunt anuntModificat, Principal principal) {
		Optional<User> user = this.userService.getUser(principal);
		if(!user.isPresent()) {
			throw new RuntimeException("Nobody logged in");
		}
		boolean hasAccess = false;
		
		Anunt anuntDb = this.repoAnunt.findById(anuntModificat.getId()).get();
		hasAccess = this.userService.isAdmin(user.get()) 
				||
				(anuntDb .getPoster() != null ? anuntDb .getPoster().equals(user.get()) : false) ; 
		if(hasAccess){
			return repoAnunt.save(anuntModificat);
		}
		throw new RuntimeException("No access");
	}

	@DeleteMapping("/delete/{id}")
	public Anunt deleteAnunt(@PathVariable("id") int id) {
		Anunt anuntulSters = repoAnunt.findById(id).get();
		repoAnunt.delete(anuntulSters);
		return anuntulSters;
	}
}
