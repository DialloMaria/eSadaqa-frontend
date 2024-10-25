export interface BeneficiaireModel {
  id: number;
  nomstructure?: string;
  telstructure?: number | null; // nullable
  emailstructure?: string | null; // nullable
  description?: string;
  logo?: string; // nullable
  adresse?: string; // nullable
  fondateur?: string;
  date_creation?: Date;
  recepisse?: string;
  image_cn?: string;
  numero_identite?: string;
  user_Id?: number | null; // nullable, foreign key to User
}
