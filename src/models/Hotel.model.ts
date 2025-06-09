// src/models/Hotel.model.ts

import { Offre } from "./Offre.model";

export interface Hotel {
  id?: number;
  nom: string;
  ville: string;
  description: string;
  nbre_etoiles: number | string;
  image_hotel:string;
  equipements?: string[];
  offre?: Offre; 
  hasOffer?: boolean; 


}
export interface HotelResponse {
  hotels: Hotel[];
  success: boolean;

}