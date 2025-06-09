import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  userRole: string | null = null;

  constructor(public authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    // Suivre l'état de la connexion et récupérer le nom de l'utilisateur et son rôle
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userName = this.authService.getUserName();
        // S'abonner à l'observable userRole$ pour récupérer le rôle
        this.authService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      } else {
        this.userName = null;
        this.userRole = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirection vers la page d'accueil ou la page de connexion
  }
}
