export interface Offre {
    id?: number; // optionnel, généré par la base
    titre: string;
    description: string;
    valeur_remise: number; // en pourcentage
    date_fin_promo: string; // au format YYYY-MM-DD
    hotel_id: number;
  }
  