import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  name!: string;
  first_name!: string;
  last_name!: string;
  avatar!: string;
  confirmpassword!: string;
  selectedRole: string = 'admin';

  isSignDivVisiable: boolean = true;
  message: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmpassword) {
      window.alert("Passwords don't match!");
      return;
    }

    this.authService.register(this.name, this.first_name, this.last_name, this.avatar, this.email, this.password, this.confirmpassword, this.selectedRole).subscribe(
      (response) => {
        console.log('Registration successful', response);
        window.alert('Registration successful');
        this.isSignDivVisiable = false;
      },
      (error) => {
        console.error('Registration failed', error);
        window.alert('Registration failed');
      }
    );
  }

  login() {
    this.authService.login(this.selectedRole, this.email, this.password).subscribe(response => {
      const token = response.access_token;
      const user = response.user;

      this.authService.setToken(token);
      this.authService.setUserName(user.name);
      this.authService.setUserAvatar(user.avatar);
      this.authService.setUserRole(user.role);
      localStorage.setItem('user_id', user.id.toString());

      if (user.role === 'admin') {
        this.router.navigateByUrl('/Dashboard');
      } else if (user.role === 'teacher') {
        this.router.navigateByUrl('/teacher');
      } else if (user.role === 'student') {
        this.router.navigateByUrl('/student');
      }
    }, error => {
      console.error('Login error', error);
      const errorMessage = error.error?.message || 'Login failed';
      window.alert(errorMessage);
    });
  }
}