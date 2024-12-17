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
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(
    private authService: AuthenticationServiceService,
    private router: Router
  ) {}

  login() {
    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response: any) => {
        if (response.isAuthenticated) {
          sessionStorage.setItem('userSession', JSON.stringify(response));
          this.router.navigate(['/home']);
        } else {
          alert('Giriş başarısız: Kullanıcı adı veya şifre hatalı.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    });
  }
}
