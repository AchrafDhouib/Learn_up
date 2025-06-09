import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speciality } from 'src/models/Speciality.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  private baseUrl = 'http://localhost:8000/api/specialities';
  private disciplineUrl = 'http://localhost:8000/api/desciplines';

  constructor(private http: HttpClient) {}

  getAllSpecialities(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(this.baseUrl);
  }

  getSpecialityById(id: number): Observable<Speciality> {
    return this.http.get<Speciality>(`${this.baseUrl}/${id}`);
  }

  addSpeciality(speciality: Speciality): Observable<Speciality> {
    return this.http.post<Speciality>(this.baseUrl, speciality);
  }

  updateSpeciality(id: number, speciality: Speciality): Observable<Speciality> {
    return this.http.put<Speciality>(`${this.baseUrl}/${id}`, speciality);
  }

  deleteSpeciality(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllDisciplines(): Observable<any[]> {
    return this.http.get<any[]>(this.disciplineUrl);
  }
}