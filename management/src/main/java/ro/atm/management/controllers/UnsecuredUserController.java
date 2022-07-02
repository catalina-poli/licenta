package ro.atm.management.controllers;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.SSLEmail;
import ro.atm.management.dto.RegisterUserDto;
import ro.atm.management.model.Role;
import ro.atm.management.model.Status;
import ro.atm.management.model.User;
import ro.atm.management.repo.RepoRole;
import ro.atm.management.repo.RepoUser;

@CrossOrigin(value = { "http://localhost:4200/" })
@RestController
@RequestMapping("/security/useri")
public class UnsecuredUserController {

	@Autowired
	private RepoUser repoUser;

	@Autowired
	private RepoRole repoRole;

	@GetMapping("/all-roles")
	public Iterable<Role> getAllRoles() {
		return this.repoRole.findAll();
	}

	@GetMapping("/confirm-account/{userId}/{emailToken}")
	public Map<String, String> confirmAccount(@PathVariable("userId") int id,
			@PathVariable("emailToken") String emailToken) {
		User user = repoUser.findById(id).get();

		if (!user.getEmailConfirmationToken().equals(emailToken)) {
			throw new RuntimeException("INVALID TOKEN USED TO CONFIRM ACCOUNT - ACCOUNT WILL BE STILL LOCKED");
		}

		user.setIsActive(1);
		repoUser.save(user);
		Map<String, String> raspuns = new HashMap<>();
		raspuns.put("RASPUNS", "OK");
		return raspuns;
	}

	private void generateSignature(User user) throws NoSuchAlgorithmException, NoSuchProviderException {
		
		KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
		kpg.initialize(1024);
		KeyPair kp = kpg.genKeyPair();
		PublicKey publicKey = kp.getPublic();
		PrivateKey privateKey = kp.getPrivate();
		

		user.setPrivateKey(privateKey.getEncoded());
		user.setPublicKey(publicKey.getEncoded());
		System.out.println("PUBLIC: " + new String(publicKey.getEncoded()));
	}

	@PostMapping("/register")
	public User registerUser(@RequestBody RegisterUserDto userDto)
			throws NoSuchAlgorithmException, NoSuchProviderException {
		User user = new User();
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setNume(userDto.getNume());
		user.setPrenume(userDto.getPrenume());
		user.setPhone(userDto.getPhone());
		user.setStatus(Status.valueOf(userDto.getStatus()));
		user.setIsActive(0);

		List<Integer> roleIds = userDto.getSelectedRoles().stream().map(x -> x.getId()).collect(Collectors.toList());
		Iterable<Role> rolesFromDb = this.repoRole.findAllById(roleIds);
		Set<Role> rolesForUser = new HashSet<>();
		for (Role role : rolesFromDb) {
			rolesForUser.add(role);
		}
		user.setUserRoles(rolesForUser);
		String emailToken = RandomStringUtils.randomAlphanumeric(10);
		user.setEmailConfirmationToken(emailToken);

		generateSignature(user);

		User userSaved = repoUser.save(user);

		SSLEmail.sendTheEmailForActivation(userSaved.getEmail(), userSaved.getId(), emailToken);
		return userSaved;
	}

	@GetMapping("/test")
	public String test() {
		return "TEST HELLO";
	}
}
