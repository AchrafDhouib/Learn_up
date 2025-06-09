// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Commentaire } from 'src/models/Commentaire.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentaireService {

//   private apiUrl = 'http://localhost:8000/api/commentaires';  // Adjust the API URL

//   constructor(private http: HttpClient) {}

//   // Fetch all commentaires from the API
//   getAllCommentaires(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   confirmerCommentaire(id: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}/confirmer`, {});
//   }
  
//   rejeterCommentaire(id: number): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}/rejeter`, {});
//   }
  
// }
