export class AuthorityCreateRequest {
  groupName: string;
  rolePermissionItems: RolePermissionItem[];
}

export class RolePermissionItem {
  screenId: number;
  create: boolean;
  delete: boolean;
  read: boolean;
  update: boolean;
}
