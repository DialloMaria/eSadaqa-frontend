export interface ProduitModel {
  id: number;
  libelle: string;
  quantite?: number ; // nullable
  montant?: number | null; // nullable
  modePaiement?: string | null; // nullable
  don_id?: number | null; // nullable, foreign key to Don
}
