export interface DonModel {
  date: any;
  montant: any;
  id?: number;
  libelle?: string;
  description?: string;
  categorie?: 'monetaire' | 'produit'; // Enum
  status?: 'en_attente' | 'reservé' | 'confirme' | 'distribué'; // Enum
  adresse?: string;
  image?: string;
  created_by?: number;
  timestamps?:Date;
}


