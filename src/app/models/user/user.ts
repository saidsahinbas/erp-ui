import {RoleType} from './role-type';
import {StatusType} from './status-type';
import {AuthorityGroup} from "../authority/authority-group";

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  role?: RoleType;
  status?: StatusType
  authorityGroup?: AuthorityGroup;
}
