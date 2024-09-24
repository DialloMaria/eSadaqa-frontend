export interface TypeProduitModel {
  id: number;
  libelle: string;
  quantite?: number | null; // nullable
  montant?: number | null; // nullable
  modePaiement?: string | null; // nullable
  don_id?: number | null; // nullable, foreign key to Don
}
