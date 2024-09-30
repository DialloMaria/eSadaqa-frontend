export interface DonModel {
  id?: number;
  libelle?: string;
  description?: string;
  categorie?: 'monetaire' | 'produit'; // Enum
  status?: 'en_attente' | 'reservé' | 'distribué'; // Enum
  adresse?: string;
  image?: string;
  created_by?: number;
}
