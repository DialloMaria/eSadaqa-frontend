export interface ReservationModel {
  id?: number;
  description?: string;
  don_Id?: number | null; // nullable, foreign key to Don
  beneficiaire_Id?: number | null; // nullable, foreign key to Beneficiaire
  organisation?: number | null; // nullable, foreign key to Beneficiaire
}
  