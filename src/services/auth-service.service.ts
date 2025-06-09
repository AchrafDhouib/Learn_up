import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8000/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_name'));
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_role'));
  private userAvatarSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_avatar'));

  constructor(private http: HttpClient) {}

  login(role: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${role}/login`, { email, password });
  }

  register(name: string, first_name: string, last_name: string, avatar: string, email: string, password: string, password_confirmation: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${role}/register`, {
      name,
      first_name,
      last_name,
      avatar,
      email,
      password,
      password_confirmation
    });
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.loggedIn.next(true);
  }

  setUserName(name: string): void {
    localStorage.setItem('user_name', name);
    this.userNameSubject.next(name);
  }

  setUserRole(role: string): void {
    localStorage.setItem('user_role', role);
    this.userRoleSubject.next(role);
  }
  setUserAvatar(avatar: string): void {
    localStorage.setItem('user_avatar', avatar);
    this.userAvatarSubject.next(avatar);
  }
  

  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }
  getUserAvatar(): string | null {
    return localStorage.getItem('user_avatar');
  }


  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_avatar');
    this.userNameSubject.next(null);
    this.userRoleSubject.next(null);
    this.loggedIn.next(false);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userName$(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  get userAvatar$(): Observable<string | null> {
    return this.userAvatarSubject.asObservable();
  }

  get userRole$(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
}
