import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from 'src/models/Offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = 'http://localhost:8000/api/offres';

  constructor(private http: HttpClient) {}

  getAllOffres(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  ajouterOffre(offre: Offre): Observable<any> {
    return this.http.post(this.apiUrl, offre);
  }

  getOfferForHotel(hotelId: number): Observable<any> {
    const url = `${this.apiUrl}/hotel/${hotelId}`;
    return this.http.get(url);
  }

  hasOffer(hotelId: number): Observable<any> {
    const url = `http://localhost:8000/api/hotels/${hotelId}/has-offer`;
    return this.http.get(url);
  }

}