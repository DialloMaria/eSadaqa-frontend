export interface OrganisationModel {
  id: number;
  nomStructure: string;
  emailStructure: string | null; // nullable
  siege: string;
  description?: string; // nullable
  fondateur: string;
  logo?: string; // nullable
  dateCreation: Date;
  recepisse: string;
  user_Id?: number | null; // nullable, foreign key to User

}
