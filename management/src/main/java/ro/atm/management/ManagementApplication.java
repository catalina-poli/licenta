package ro.atm.management;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import ro.atm.data.es.model.Article;
import ro.atm.data.es.model.Author;
import ro.atm.data.es.model.CerereESModel;
import ro.atm.data.es.repository.ArticleRepository;
import ro.atm.data.es.repository.CerereESRepository;

@SpringBootApplication
@EntityScan(basePackages = {"ro.atm.management.model"})
@EnableJpaRepositories(basePackages = {"ro.atm.management.repo"})
@ComponentScan(basePackages = {"ro.atm.management",
		"ro.atm.management.controllers", 
		"ro.atm.management.service", 
		"ro.atm.management.security", 
		"ro.atm.management.converters",
		"ro.atm.data.es.config"})
public class ManagementApplication implements CommandLineRunner{

	
	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	private CerereESRepository cerereESRepository;
	
	public static void main(String[] args) {
		
		SpringApplication.run(ManagementApplication.class, args);
		
	}

	@Override
	public void run(String... args) throws Exception {
		
//		Article article = new Article();
//		article.setTags("TAG 1");
//		article.setTitle("ARTICOL 1");
//		
//		Author author = new Author();
//		author.setName("UNAUTOR");
//		
//		List<Author> authors = new ArrayList<>();
//		article.setAuthors(authors);
//		
//		this.articleRepository.save(article);
		
		CerereESModel cm = new CerereESModel();
		cm.setDocumentOrDetailed("CERERE_DETAILED");
		cm.setMotiv("Doresc vacanta");
		cm.setUserEmail("someuser@gmail.com");
		
		
		this.cerereESRepository.save(cm);
		
		System.out.println("SAVED ARTICLE");
	}

}
