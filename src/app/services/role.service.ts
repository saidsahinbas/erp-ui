import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../models/user/role";
import {AuthorityGroup} from "../models/authority/authority-group";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly roleUrl = environment.API_URL + '/role';
  constructor(private http: HttpClient) { }

  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.roleUrl}/all`);
  }
}
