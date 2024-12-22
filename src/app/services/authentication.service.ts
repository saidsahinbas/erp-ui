import { Injectable } from '@angular/core';
import {LoginRequest} from "../models/login/login-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginUrl = environment.API_URL  + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.loginUrl}/login`, loginRequest);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('userSession');
  }

  logout() {
    sessionStorage.removeItem('userSession');
  }
}
