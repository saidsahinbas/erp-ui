import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorityGroup} from "../models/authority-group";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private readonly userUrl = 'http://localhost:8081/api/authority';

  constructor(private httpClient: HttpClient) { }

  getAllAuthorities(): Observable<AuthorityGroup[]> {
    return this.httpClient.get<AuthorityGroup[]>(`${this.userUrl}` + "/all");
  }
}
