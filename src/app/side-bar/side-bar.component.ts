import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  userRole: string | null = null;
  userAvatar: string | null = null;

  constructor(public authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        this.userName = this.authService.getUserName();
        this.userAvatar = this.authService.getUserAvatar();

        // Use one-time subscription for role (assuming it doesn't change mid-session)
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
    this.router.navigate(['/']);
  }
}
