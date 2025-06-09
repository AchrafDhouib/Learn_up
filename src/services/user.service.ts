import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  is_active: number;
  roles: string;
  groups: { name: string }[];
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUsers(role: string = ''): Observable<User[]> {
    const url = role ? `${this.apiUrl}/auth/users?role=${role}` : `${this.apiUrl}/auth/users`;
    return this.http.get<User[]>(url, this.authHeaders());
  }

  activateUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}/activate`, {}, this.authHeaders());
  }

  deactivateUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}/deactivate`, {}, this.authHeaders());
  }

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      })
    };
  }
}