import {RolePermissionItem} from "./authority-create-request";

export class AuthorityGroupUpdateRequest {
  id: number;
  groupName: string;
  rolePermissionItems: RolePermissionItem[];
}
