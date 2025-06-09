export interface Chambre {
  id: number;
  type_chambre: string;
  numero: string;
  prixparnuit: number;
  prix_avec_remise: number;
  disponibilite: boolean;
  hotel_id: number;
  image_chambre: string;
}