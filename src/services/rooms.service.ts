import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel, HotelResponse } from 'src/models/Hotel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private baseUrl = 'http://localhost:8000/api';


  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/chambres`);
  }

  getHotelWithRooms(hotelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/hotels/${hotelId}`);
  }

  addRoom(room: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/chambres`, room);
  }

  updateRoom(roomId: number, roomData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/chambres/${roomId}`, roomData);
  }

  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/chambres/${roomId}`);
  }
}
