import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorityGroup} from "../models/authority-group";
import {AuthorityCreateRequest} from "../models/authority-create-request";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private readonly userUrl = 'http://localhost:8081/api/authority';

  constructor(private httpClient: HttpClient) { }

  getAllAuthorities(): Observable<AuthorityGroup[]> {
    return this.httpClient.get<AuthorityGroup[]>(`${this.userUrl}` + "/all");
  }

  createAuthorityGroup(authorityCreateRequest: AuthorityCreateRequest): Observable<AuthorityGroup> {
    return this.httpClient.post<AuthorityGroup>(`${this.userUrl}` + '/create', authorityCreateRequest);
  }

  getAuthorityById(id: number): Observable<AuthorityGroup> {
    return this.httpClient.get<AuthorityGroup>(this.userUrl + `/${id}`);
  }
}
