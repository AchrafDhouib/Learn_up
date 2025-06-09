import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel, HotelResponse } from 'src/models/Hotel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private API_URL = 'http://127.0.0.1:8000/api/hotels'; // Route API Laravel


  constructor(private http: HttpClient) { }


  getAllHotel(): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(this.API_URL);
  }

  getHotelById(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${hotelId}`);
  }


  addHotel(data: Hotel) {
    return this.http.post<Hotel>(this.API_URL, data);
  }

  deleteHotel(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  filterHotels(filters: any): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(this.API_URL + '/filter', { params: filters });
  }

  getChambresByHotelId(hotelId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${hotelId}/chambres`);
  }

  updateHotel(id: number, data: Hotel) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
}
