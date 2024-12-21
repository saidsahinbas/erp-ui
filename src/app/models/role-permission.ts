import {AuthorityGroup} from "./authority-group";
import {Screen} from "./screen";

export class RolePermission {
  id: number;
  authorityGroup: AuthorityGroup;
  screen: Screen;
  read: boolean;
  update: boolean;
  create: boolean;
  delete: boolean;
}
