package ro.atm.management.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import ro.atm.management.model.Anunt;
import ro.atm.management.model.CategorieSablon;
import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDocument;
import ro.atm.management.model.Message;
import ro.atm.management.repo.RepoAnunt;
import ro.atm.management.repo.RepoCategorieSablon;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoCerereDocument;
import ro.atm.management.repo.RepoMessage;

@Service
public class FileStorageService {

	private final Path fileStorageLocation;

//    @Autowired
//    private FileStorageProperties fileStorageProperties;

	// TODO: move to a service class
	@Autowired
	private RepoCerereDocument repoCerereDocument;

	@Autowired
	private RepoCerere repoCerere;

	@Autowired
	private RepoAnunt repoAnunt;

	@Autowired
	private RepoCategorieSablon repoCategorieSablon;

	@Autowired
	private RepoMessage repoMessage;

	public FileStorageService() {
		this.fileStorageLocation = Paths.get(IDetail.uploadPath).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}

	public CategorieSablon storeFileSablon(MultipartFile file, String sablonLeafCategoryNodeName,
			int categorieParinteId) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			CategorieSablon categorieSablon = new CategorieSablon();
			categorieSablon.setCategoryName(sablonLeafCategoryNodeName);
			categorieSablon.setFile(file.getInputStream().readAllBytes());
			categorieSablon.setDocumentType(file.getContentType());
			CategorieSablon parinte = this.repoCategorieSablon.findById(categorieParinteId).get();
			categorieSablon.setCategorieParinte(parinte);
			categorieSablon.setFilename(fileName);
			CategorieSablon saved = this.repoCategorieSablon.save(categorieSablon);

			return saved;
		} catch (IOException ex) {
			throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
		}

	}

	public Anunt storeFileAnunt(MultipartFile file, String title) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			Anunt anuntDocument = new Anunt();
			anuntDocument.setTitlu(title);
			anuntDocument.setContents(file.getInputStream().readAllBytes());
			anuntDocument.setDocumentType(file.getContentType());
			anuntDocument.setFilename(fileName);
			Anunt saved = this.repoAnunt.save(anuntDocument);

			return saved;
		} catch (IOException ex) {
			throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
		}

	}

	public String storeFile(MultipartFile file, String documentType, Integer idCerere) {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			if (documentType != null) {
				// various types of documents - cerere, anunt etc.
				if (documentType.equals("cerere")) {
					CerereDocument doc = new CerereDocument();
					doc.setContents(file.getInputStream().readAllBytes());
					doc.setDocumentType(file.getContentType());
//					int idCerere = 28; // TODO: remove hardcoding
					// TODO: set denumire document!!!!
					Cerere cerere = this.repoCerere.findById(idCerere).get();
//					doc.setIdCerere(idCerere);
					doc.setCerere(cerere);
					doc.setFilename(fileName);

					try {

						KeyFactory keyFactory = KeyFactory.getInstance("RSA");
						
//						X509EncodedKeySpec bobPubKeySpec = new X509EncodedKeySpec(//pub key
//								cerere.getUserAssociated().getPublicKey());
						PKCS8EncodedKeySpec cheiePrivata = new PKCS8EncodedKeySpec(//prv key
								cerere.getUserAssociated().getPrivateKey());
						
						PrivateKey userPrivKey = keyFactory.generatePrivate(cheiePrivata);

						Signature sig = Signature.getInstance("SHA1WithRSA");
						sig.initSign(userPrivKey);
						sig.update(doc.getContents());
						byte[] signatureBytes = sig.sign();
						doc.setSignature(signatureBytes);

					} catch (Exception e) {
						System.out.println("ERR GENERATING KEYS");
						e.printStackTrace();
					}

					// doc.setContents(null);
					this.repoCerereDocument.save(doc);

					Message message = new Message();
					message.setContents("New cerere added");
					message.setDatePosted(new Date());
					message.setMessageType("system");
					message.setReceiver(cerere.getUserAssociated());

					this.repoMessage.save(message);
				}
			}

			return fileName;
		} catch (IOException ex) {
			throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		try {
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new RuntimeException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new RuntimeException("File not found " + fileName, ex);
		}
	}
}