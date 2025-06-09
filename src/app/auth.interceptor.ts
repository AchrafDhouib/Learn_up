import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Obtenez le token à partir du service d'authentification
    
    if (token) {
      // Si le token est disponible, ajoutez-le à l'en-tête de la requête
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Ajoutez le token dans l'en-tête
        }
      });
      return next.handle(clonedRequest); // Passez la requête modifiée
    }

    // Si aucun token n'est trouvé, passez la requête originale sans modification
    return next.handle(req);
  }
}