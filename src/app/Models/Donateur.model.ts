export interface DonateurModel {
  id?: number;
  nom?: string;
  prenom ?: string;
  email ?: string;
  adresse ?: string;
  telephone ?: number;
  nomstructure?: string;
  emailstructure?: string | null; // nullable
  description?: string;
  typestructure?: 'micro' | 'macro'; // Enum
  siege?: string;
  logo?: string; // nullable
  date_creation?: Date;
  recepisse?: string;
  user_Id?: number | null; // nullable, foreign key to User
  user: any;
  photo_profile?: string;
}


