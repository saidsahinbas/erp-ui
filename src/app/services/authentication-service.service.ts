import { Injectable } from '@angular/core';
import {LoginRequest} from "../models/login-request";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private readonly loginUrl = 'http://localhost:8081/api/auth/login';

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.loginUrl}`, loginRequest);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('userSession');
  }
}
