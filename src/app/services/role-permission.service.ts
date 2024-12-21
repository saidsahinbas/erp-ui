import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RolePermission} from "../models/role-permission";

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  private readonly userUrl = 'http://localhost:8081/api/rolePermission';

  constructor(private httpClient: HttpClient) { }

  getPermissionsByAuthorityGroup(authorityId: number) {
    return this.httpClient.get<RolePermission[]>(this.userUrl + `/${authorityId}/permissions`);
  }
}
