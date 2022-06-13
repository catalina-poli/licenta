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

	// private Integer userId;

	private String userEmail;

	private String typeCerere; // invoire, permisie, restanta

	private String documentOrDetailed;

	// TODO: add date start, end

	private String localitate;
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
	public String getLocalitate() {
		return localitate;
	}
	public void setLocalitate(String localitate) {
		this.localitate = localitate;
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
	@Override
	public String toString() {
		return "CerereESModel [id=" + id + ", userEmail=" + userEmail + ", typeCerere=" + typeCerere
				+ ", documentOrDetailed=" + documentOrDetailed + ", localitate=" + localitate + ", motiv=" + motiv
				+ ", judet=" + judet + "]";
	}
	
	
}
