import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/user/role";
import {AuthorityGroup} from "../models/authority/authority-group";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly userUrl = 'http://localhost:8081/api/role';
  constructor(private http: HttpClient) { }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.userUrl}/all`);
  }
}
