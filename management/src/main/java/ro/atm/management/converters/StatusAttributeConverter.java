package ro.atm.management.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import ro.atm.management.model.Status;

@Converter
public class StatusAttributeConverter implements AttributeConverter<Status, String> {

	@Override
	public String convertToDatabaseColumn(Status attribute) {
		if (attribute == null)
			return null;

		switch (attribute) {
		case CIVIL:
			return "civil";

		case MILITAR:
			return "militar";

		default:
			throw new IllegalArgumentException(attribute + " not supported.");
		}
	}

	@Override
	public Status convertToEntityAttribute(String dbData) {
		 if (dbData == null)
	            return null;
	 
	        switch (dbData) {
	        case "civil":
	            return Status.CIVIL;
	 
	        case "militar":
	            return Status.MILITAR;
	 
	        default:
	            throw new IllegalArgumentException(dbData + " not supported.");
	        }
	}

}
