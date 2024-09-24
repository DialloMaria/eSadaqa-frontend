export interface DonateurModel {
  id?: number;
  nomStructure?: string;
  emailStructure?: string | null; // nullable
  description?: string;
  typeStructure?: 'micro' | 'macro'; // Enum
  siege?: string;
  logo?: string; // nullable
  dateCreation?: Date;
  recepisse?: string;
  user_Id?: number | null; // nullable, foreign key to User

}
