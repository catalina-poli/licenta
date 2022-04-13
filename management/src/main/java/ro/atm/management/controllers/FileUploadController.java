package ro.atm.management.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ro.atm.management.dto.Response;
import ro.atm.management.model.CategorieSablon;
import ro.atm.management.service.FileStorageService;

@RestController
public class FileUploadController {

	@Autowired
	private FileStorageService fileStorageService;

	@PostMapping("/uploadFile-sablon/{nodeName}/{idParent}")
	public CategorieSablon uploadFileSablon(@RequestParam("file") MultipartFile file, @PathVariable("nodeName")String nodeName, @PathVariable("idParent")int idParent) {
		CategorieSablon categorieSablonSaved = fileStorageService.storeFileSablon(file,nodeName, idParent);
		// TODO: remove hardcoding ^
//		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
//				.path(fileName).toUriString();

		return categorieSablonSaved;
	}
	
	@PostMapping("/uploadFile")
	public Response uploadFile(@RequestParam("file") MultipartFile file) {
		String fileName = fileStorageService.storeFile(file, "cerere");
		// TODO: remove hardcoding ^
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(fileName).toUriString();

		return new Response(fileName, fileDownloadUri, file.getContentType(), file.getSize());
	}

	@PostMapping("/uploadMultipleFiles")
	public List<Response> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> uploadFile(file)).collect(Collectors.toList());
	}
}