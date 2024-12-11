import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRequest} from "../../../models/login-request";
import {AuthenticationServiceService} from "../../../services/authentication-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userEmail: string = '';
  userPassword: string = '';
  loginError: boolean = false;

  constructor(
    private authService: AuthenticationServiceService,
    private router: Router
  ) {
  }

  onLogin(): void {
    const loginRequest: LoginRequest = {
      email: this.userEmail,
      password: this.userPassword
    };

    this.authService.login(loginRequest).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          localStorage.setItem('userEmail', this.userEmail); // Store user email in localStorage
          this.router.navigate(['/home']); // Redirect to home page
        } else {
          this.loginError = true; // Display error message
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = true; // Display error message
      }
    });
  }
}
