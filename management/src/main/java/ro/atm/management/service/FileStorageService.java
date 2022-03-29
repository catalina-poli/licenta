package ro.atm.management.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import ro.atm.management.model.Cerere;
import ro.atm.management.model.CerereDocument;
import ro.atm.management.repo.RepoCerere;
import ro.atm.management.repo.RepoCerereDocument;

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

	public FileStorageService() {
		this.fileStorageLocation = Paths.get(IDetail.uploadPath).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}

	public String storeFile(MultipartFile file, String documentType) {
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
					int idCerere = 28;
					Cerere cerere = this.repoCerere.findById(idCerere).get();
//					doc.setIdCerere(idCerere);
					doc.setCerere(cerere);
					this.repoCerereDocument.save(doc);
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