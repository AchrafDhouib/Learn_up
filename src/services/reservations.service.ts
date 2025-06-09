import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/models/Reservation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8000/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }

  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

 
  getReservationsByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
  }
  
  confirmReservation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/confirmer`, {});
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/annuler`, {});
  }
}
