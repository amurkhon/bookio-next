import { PropertyCategory, PropertyLocation, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyCategory?: PropertyCategory;
	propertyTitle?: string;
	propertyAuthor?: string;
	propertyPrice?: number;
	propertyPages?: number;
	propertyImages?: string[];
	propertyLanguages?: string[];
	propertyDesc?: string;
	propertyFile?: string;
	propertyAudio?: string;
	publicationDate?: Date;
	deletedAt?: Date;
}
