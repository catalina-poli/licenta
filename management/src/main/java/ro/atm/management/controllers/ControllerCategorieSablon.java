package ro.atm.management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ro.atm.management.model.CategorieSablon;
import ro.atm.management.repo.RepoCategorieSablon;


@RestController
@RequestMapping("/rest/sabloane-categorii")
public class ControllerCategorieSablon {

	@Autowired
	private RepoCategorieSablon repoCategorieSablon;
	
	
	@GetMapping("/get-root-categorii")
	public List<CategorieSablon> getCategoriiRadacina(){
		return this.repoCategorieSablon.findAllByCategorieParinteIsNull();
	}
	
	
}
