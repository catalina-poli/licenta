package ro.atm.data.es.model;

import org.springframework.data.elasticsearch.annotations.Document;

import static org.springframework.data.elasticsearch.annotations.FieldType.Keyword;
import static org.springframework.data.elasticsearch.annotations.FieldType.Text;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;

@Document(indexName = "cereri")
public class CerereESModel {

	@Id
	private String id;

	private String idCerereSalvataDocumentOrDetailed;
	// private Integer userId;
	@Field(type = Text)
	private String userEmail;

	@Field(type = Text)
	private String typeCerere; // invoire, permisie, restanta

	@Field(type = Text)
	private String documentOrDetailed;


	@Field(type = Text)
	private String location;

	@MultiField(mainField = @Field(type = Text, fielddata = true), otherFields = {
			@InnerField(suffix = "verbatim", type = Keyword) })
	private String motiv;
	@Field(type = Keyword)
	private String judet;

	// TODO: add ora plecare, ora sosire
	//
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getTypeCerere() {
		return typeCerere;
	}

	public void setTypeCerere(String typeCerere) {
		this.typeCerere = typeCerere;
	}

	public String getDocumentOrDetailed() {
		return documentOrDetailed;
	}

	public void setDocumentOrDetailed(String documentOrDetailed) {
		this.documentOrDetailed = documentOrDetailed;
	}



	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getMotiv() {
		return motiv;
	}

	public void setMotiv(String motiv) {
		this.motiv = motiv;
	}

	public String getJudet() {
		return judet;
	}

	public void setJudet(String judet) {
		this.judet = judet;
	}

	public String getIdCerereSalvataDocumentOrDetailed() {
		return idCerereSalvataDocumentOrDetailed;
	}

	public void setIdCerereSalvataDocumentOrDetailed(String idCerereSalvataDocumentOrDetailed) {
		this.idCerereSalvataDocumentOrDetailed = idCerereSalvataDocumentOrDetailed;
	}

	@Override
	public String toString() {
		return "CerereESModel [id=" + id + ", idCerereSalvataDocumentOrDetailed=" + idCerereSalvataDocumentOrDetailed
				+ ", userEmail=" + userEmail + ", typeCerere=" + typeCerere + ", documentOrDetailed="
				+ documentOrDetailed + ", localitate=" + location + ", motiv=" + motiv + ", judet=" + judet + "]";
	}

}
