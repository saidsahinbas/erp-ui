import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorityGroup} from "../models/authority/authority-group";
import {AuthorityCreateRequest} from "../models/authority/authority-create-request";
import {AuthorityGroupUpdateRequest} from "../models/authority/authority-group-update-request";
import {AuthorityGroupRemoveUserRequest} from "../models/authority/authority-group-remove-user-request";
import {AuthorityGroupAddUserRequest} from "../models/authority/authority-group-add-user-request";
import {User} from "../models/user/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private readonly authorityUrl = environment.API_URL +  '/authority';

  constructor(private httpClient: HttpClient) { }

  getAllAuthorities(): Observable<AuthorityGroup[]> {
    return this.httpClient.get<AuthorityGroup[]>(`${this.authorityUrl}` + "/all");
  }

  createAuthorityGroup(authorityCreateRequest: AuthorityCreateRequest): Observable<AuthorityGroup> {
    return this.httpClient.post<AuthorityGroup>(`${this.authorityUrl}` + '/create', authorityCreateRequest);
  }

  getAuthorityById(id: number): Observable<AuthorityGroup> {
    return this.httpClient.get<AuthorityGroup>(this.authorityUrl + `/${id}`);
  }

  updateAuthorityGroup(updateRequest: AuthorityGroupUpdateRequest) {
    return this.httpClient.post<AuthorityGroup>(`${this.authorityUrl}` + '/update', updateRequest);
  }

  addUserToAuthorityGroup(authorityGroupAddUserRequest: AuthorityGroupAddUserRequest): Observable<User> {
    return this.httpClient.post<AuthorityGroupAddUserRequest>(`${this.authorityUrl}/adduser`, authorityGroupAddUserRequest);
  }

  removeUserFromAuthorityGroup(authorityGroupRemoveUserRequest: AuthorityGroupRemoveUserRequest): Observable<User> {
    return this.httpClient.post<AuthorityGroupRemoveUserRequest>(`${this.authorityUrl}/removeUser`, authorityGroupRemoveUserRequest);
  }

}
