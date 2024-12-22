import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthorityService} from "../../../services/authority.service";
import {Router} from "@angular/router";
import {UserCreateRequest} from "../../../models/user/user-create-request";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: UserCreateRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: 2,
    authorityGroupId: 0,
    status: 'active'
  };

  authorities: { id: number; name: string }[] = [];

  roles: { id: number; name: string }[] = [];

  constructor(private roleService : RoleService,
    private router: Router,
    private userService: UserService,
    private authorityService: AuthorityService
  ) {}

  ngOnInit(): void {
    this.loadAuthorities();
    this.loadRoles();
  }

  handleCreateUser(): void {
    if (this.validateForm()) {
      this.userService.createUser(this.user).subscribe(
        (res) => {
          console.log('User created successfully:', res);
          this.router.navigate(['/manage-user']); // Redirect to user list after creation
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.error('Form validation failed. Please fill in all required fields.');
    }
  }

  loadAuthorities(): void {
    this.authorityService.getAllAuthorities().subscribe(
      (res) => {
        console.log(res);
        this.authorities = res;
      },
      (error) => {
        console.error('Failed to load authority groups:', error);
      }
    );
  }

  loadRoles(): void {
    this.roleService.getAllRole().subscribe(
      (res) => {
        this.roles = res;
      },
      (error) => {
        console.error('Failed to load roles:', error);
      }
    )
  }

  validateForm(): boolean {
    return (
      this.user.firstName.trim() !== '' &&
      this.user.lastName.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.authorityGroupId > 0 &&
      this.user.status.trim() !== ''
    );
  }
}
