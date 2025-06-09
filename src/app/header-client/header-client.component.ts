import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = '';


  constructor(public authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.userName = this.authService.getUserName(); // récupère le nom dès que connecté
      } else {
        this.userName = null; // ou '' si tu préfères
      }
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirection après logout
  }
}