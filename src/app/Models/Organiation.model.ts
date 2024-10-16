export interface OrganisationModel {
  user: any;
  id?: number;
  nom?: string;
  prenom ?: string;
  email ?: string;
  adresse ?: string;
  telephone ?: number;
  password ?: string;
  nomstructure?: string;
  emailstructure?: string | null; // nullable
  siege: string;
  description?: string; // nullable
  fondateur: string;
  logo?: string; // nullable
  date_creation?: Date;
  recepisse: string;
  user_Id?: number | null; // nullable, foreign key to User

}
