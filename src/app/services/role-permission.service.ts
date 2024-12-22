import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RolePermission} from "../models/user/role-permission";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  private readonly rolePermissionUrl = environment.API_URL + '/rolePermission';

  constructor(private httpClient: HttpClient) { }

  getPermissionsByAuthorityGroup(authorityId: number) {
    return this.httpClient.get<RolePermission[]>(this.rolePermissionUrl + `/${authorityId}/permissions`);
  }
}
