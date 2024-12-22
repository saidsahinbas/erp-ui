import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user";
import {Observable} from "rxjs";
import {UserCreateRequest} from "../models/user/user-create-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl = 'http://localhost:8081/api/user';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userUrl}/all`);
  }

  createUser(user: UserCreateRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.userUrl}` + '/create', user);
  }

  getUsersByAuthorityGroup(authorityId: number) {
    return this.httpClient.get<User[]>(this.userUrl + `/${authorityId}/users`);

  }

  deleteUser(userId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.userUrl}/${userId}/delete`, { responseType: 'text' as 'json' });
  }

}
