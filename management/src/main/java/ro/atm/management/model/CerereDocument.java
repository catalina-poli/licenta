package ro.atm.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="cereri_document")
public class CerereDocument {
//	create table cereri_document(
//			id_cerere int primary key,
//		    foreign key(id_cerere) references cereri(id),
//		    contents longblob,
//		    document_type varchar(550)
//		)engine = innodb;
	
	@Id
	@Column(name="id_cerere")
	private Integer idCerere;
	
	@Column(name="document_type")
	private String documentType;
	
	@Lob
	private byte[] contents;
	
	@OneToOne
    @MapsId
    @JoinColumn(name = "id_cerere")
    private Cerere cerere;

	public Integer getIdCerere() {
		return idCerere;
	}

	public void setIdCerere(Integer idCerere) {
		this.idCerere = idCerere;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public byte[] getContents() {
		return contents;
	}

	public void setContents(byte[] contents) {
		this.contents = contents;
	}

	public Cerere getCerere() {
		return cerere;
	}

	public void setCerere(Cerere cerere) {
		this.cerere = cerere;
	}
	
	
}
