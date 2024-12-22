export class UserCreateRequest {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  roleId: number = 2; // Varsayılan değer
  authorityGroupId: number = 0; // Varsayılan değer
  status: string = ''; // Varsayılan değer
}
