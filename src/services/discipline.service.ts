import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discipline } from 'src/models/Discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private baseUrl = 'http://localhost:8000/api/desciplines';

  constructor(private http: HttpClient) {}

  getAllDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.baseUrl);
  }

  getDisciplineById(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${this.baseUrl}/${id}`);
  }

  addDiscipline(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.baseUrl, discipline);
  }

  updateDiscipline(id: number, discipline: Discipline): Observable<Discipline> {
    return this.http.put<Discipline>(`${this.baseUrl}/${id}`, discipline);
  }

  deleteDiscipline(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}