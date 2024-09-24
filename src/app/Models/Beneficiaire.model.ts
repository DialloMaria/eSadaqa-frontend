export interface BeneficiaireModel {
  id: number;
  nomStructure?: string;
  telStructure?: number | null; // nullable
  emailStructure?: string | null; // nullable
  description?: string;
  logo?: string; // nullable
  adresse?: string; // nullable
  fondateur?: string;
  dateCreation?: Date;
  recepisse?: string;
  user_Id?: number | null; // nullable, foreign key to User
}
