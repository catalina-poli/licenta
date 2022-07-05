package ro.atm.management.controllers;

import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.dto.DtoFlow;
import ro.atm.management.dto.DtoFlowUpdateStatus;
import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDetailed;
import ro.atm.management.model.CerereDocument;
import ro.atm.management.model.FlowCerere;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoCerereDetailed;
import ro.atm.management.repo.RepoCerereDocument;
import ro.atm.management.repo.RepoFlowCerere;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController
@RequestMapping("/rest/flow")
public class FlowController {

	@Autowired
	private RepoFlowCerere repoFlow;

	@Autowired
	private RepoCerere repoCerere;

	@Autowired
	private RepoCerereDetailed repoCerereDetailed;

	@Autowired
	private RepoCerereDocument repoCerereDocument;

	@Autowired
	private RepoUser repoUser;

	@GetMapping("/all")
	public Iterable<FlowCerere> all() {
		return repoFlow.findAll();
	}

	@GetMapping("/by-cerere-id/{id}")
	public List<FlowCerere> findByCerereId(@PathVariable("id") int id) {
		Cerere cerere = repoCerere.findById(id).get();
		return repoFlow.findByCerere(cerere);
	}

	@GetMapping("/by-cerere-detailed-id/{id}")
	public List<FlowCerere> findByDetailedCerereId(@PathVariable("id") int id) {
		CerereDetailed cerere = repoCerereDetailed.findById(id).get();
		return repoFlow.findByCerereDetailed(cerere);
	}

	@PostMapping("/save")
	public FlowCerere save(@RequestBody DtoFlow dtoFlow) {

		// TODO: checks and validations
		FlowCerere flow = new FlowCerere();
		flow.setCerere(repoCerere.findById(dtoFlow.getIdCerere()).get());
		flow.setSuperior(repoUser.findById(dtoFlow.getIdSuperior()).get());
		flow.setMotiv(dtoFlow.getMotiv());
		flow.setStatus(dtoFlow.getStatus());
		return repoFlow.save(flow);
	}
	
	

	@GetMapping("/verify-signature/{id}")
	public Map<String, Boolean> verifySignature(@PathVariable("id") int id)
			throws InvalidKeySpecException, NoSuchAlgorithmException, InvalidKeyException, SignatureException {
		Map<String, Boolean> result = new HashMap<>();

		FlowCerere flow = this.repoFlow.findById(id).get();
		CerereDocument doc = this.repoCerereDocument.findById(flow.getCerere().getId()).get();

		KeyFactory keyFactory = KeyFactory.getInstance("RSA");

		User userSemnatar = this.repoUser.findById(flow.getSuperior().getId()).get();
//		User userAssociated = doc.getCerere().getUserAssociated();
		System.out.println("USER ASSOCIATED: " + userSemnatar.getEmail());
		X509EncodedKeySpec cheiePublica = new X509EncodedKeySpec(// pub key
				doc.getCerere().getUserAssociated().getPublicKey());
		PublicKey userPubKey = keyFactory.generatePublic(cheiePublica);

		Signature publicSignature = Signature.getInstance("SHA1WithRSA");

		publicSignature.initVerify(userPubKey);
		publicSignature.update(doc.getContents());
		boolean verificationStatus = publicSignature.verify(doc.getSignature());

		result.put("verificationStatus", verificationStatus);
		return result;
	}

	@PutMapping("/update-status")
	public FlowCerere modifyStatus(@RequestBody DtoFlowUpdateStatus dto, Principal principal) {
		System.out.println("DtO: " + dto);
		User userLoggedIn = this.repoUser.findByEmail(principal.getName()).get();
		FlowCerere flowItem = this.repoFlow.findById(dto.getIdFlowItem()).get();
		flowItem.setStatus(dto.getStatusItem());
		flowItem.setMotiv(dto.getMotiv());
		// the user modifying the flow item should be the valid user that has access to
		// modify the item
		if (!userLoggedIn.getId().equals(flowItem.getSuperior().getId())) {
			throw new RuntimeException("Security issue - invalid user");
		}

		// KeyFactory keyFactory = KeyFactory.getInstance("RSA");

		try {
			if (flowItem.getCerere() != null) { // semnare cerere document

				CerereDocument doc = repoCerereDocument.findById(flowItem.getCerere().getId()).get();

				KeyFactory keyFactory = KeyFactory.getInstance("RSA");
				User superior = flowItem.getSuperior();
				PKCS8EncodedKeySpec cheiePrivataSuperior = new PKCS8EncodedKeySpec(superior.getPrivateKey());

				PrivateKey userPrivKeySuperior = keyFactory.generatePrivate(cheiePrivataSuperior);

				Signature sigSuperior = Signature.getInstance("SHA1WithRSA");
				sigSuperior.initSign(userPrivKeySuperior);
				sigSuperior.update(doc.getContents());
				byte[] signatureBytesSuperior = sigSuperior.sign();
				flowItem.setSignature(signatureBytesSuperior);
				this.repoFlow.save(flowItem);
			}
		} catch (Exception e) {
			System.out.println("ERROR SAVING SIGNATURE");
			e.printStackTrace();
		}

		return this.repoFlow.save(flowItem);
	}

}
