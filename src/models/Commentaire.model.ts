import { Hotel } from "./Hotel.model";
import { User } from "./User.model";

export class Commentaire {
    id!: number;
    note!: number;
    message!: string;  
    statut!: string;
    client!: User;
    hotel!: Hotel;
  }
  