export interface RapportModel {
  id: number;
  contenu: string;
  reservation_Id?: number | null; // nullable, foreign key to Reservation
  beneficiaire_Id?: number | null; // nullable, foreign key to Beneficiaire
  organisation_Id?: number | null; // nullable, foreign key to Beneficiaire
  donateur_Id?: number | null; // nullable, foreign key to Beneficiaire
}
