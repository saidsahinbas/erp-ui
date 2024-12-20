import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {UserCreateRequest} from "../models/user-create-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl = 'http://localhost:8081/api/user';

  constructor(private httpClient: HttpClient) { }

  createUser(user: UserCreateRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.userUrl}` + '/create', user);
  }
}
