// export interface ReservationModel {
//   id?: number;
//   description?: string;
//   don_Id?: number | null; // nullable, foreign key to Don
//   beneficiaire_Id?: number | null; // nullable, foreign key to Beneficiaire
//   organisation?: number | null; // nullable, foreign key to Beneficiaire
//   user_id?: number | null; // nullable, foreign key to

import { DonModel } from "./Don.model";
import { OrganisationModel } from "./Organiation.model";

// }
export interface ReservationModel {
  id: number;
  description: string;
  don_id: number;
  beneficiaire_id: number;
  created_by: number;
  modified_by: number | null;
  created_at: string;
  updated_at: string;
  organisation_id: number;
  user_id: number;
  don: DonModel;
  organisation: OrganisationModel;
}
