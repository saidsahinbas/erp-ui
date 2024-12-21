import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../services/authority.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {RolePermissionService} from "../../../services/role-permission.service";

@Component({
  selector: 'app-user-authority-detail',
  templateUrl: './user-authority-detail.component.html',
  styleUrls: ['./user-authority-detail.component.css']
})
export class UserAuthorityDetailComponent implements OnInit {
  authorityId!: number;
  authorityDetails: any;
  users: any[] = [];
  rolePermissions: any[] = [];

  // Pagination variables for users
  currentPageUsers: number = 1;
  usersPerPage: number = 5;
  paginatedUsers: any[] = [];
  totalPagesUsers: number = 0;
  pagesUsers: number[] = [];

  // Pagination variables for role permissions
  currentPagePermissions: number = 1;
  permissionsPerPage: number = 10;
  paginatedPermissions: any[] = [];
  totalPagesPermissions: number = 0;
  pagesPermissions: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private authorityService: AuthorityService,
    private userService: UserService,
    private rolePermissionService: RolePermissionService
  ) {}

  ngOnInit(): void {
    this.authorityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadAuthorityDetails();
    this.loadUsers();
    this.loadRolePermissions();
  }

  loadAuthorityDetails(): void {
    this.authorityService.getAuthorityById(this.authorityId).subscribe(
      (res) => (this.authorityDetails = res),
      (error) => console.error('Error fetching authority details:', error)
    );
  }

  loadUsers(): void {
    this.userService.getUsersByAuthorityGroup(this.authorityId).subscribe(
      (res) => {
        this.users = res;
        this.totalPagesUsers = Math.ceil(this.users.length / this.usersPerPage);
        this.pagesUsers = Array.from({ length: this.totalPagesUsers }, (_, i) => i + 1);
        this.paginateUsers();
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  loadRolePermissions(): void {
    this.rolePermissionService.getPermissionsByAuthorityGroup(this.authorityId).subscribe(
      (res) => {
        this.rolePermissions = res;
        this.totalPagesPermissions = Math.ceil(this.rolePermissions.length / this.permissionsPerPage);
        this.pagesPermissions = Array.from({ length: this.totalPagesPermissions }, (_, i) => i + 1);
        this.paginatePermissions();
      },
      (error) => console.error('Error fetching permissions:', error)
    );
  }

  paginateUsers(): void {
    const startIndex = (this.currentPageUsers - 1) * this.usersPerPage;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.usersPerPage);
  }

  paginatePermissions(): void {
    const startIndex = (this.currentPagePermissions - 1) * this.permissionsPerPage;
    this.paginatedPermissions = this.rolePermissions.slice(startIndex, startIndex + this.permissionsPerPage);
  }

  goToPage(type: string, pageNumber: number): void {
    if (type === 'users') {
      this.currentPageUsers = pageNumber;
      this.paginateUsers();
    } else if (type === 'permissions') {
      this.currentPagePermissions = pageNumber;
      this.paginatePermissions();
    }
  }

  nextPage(type: string): void {
    if (type === 'users' && this.currentPageUsers < this.totalPagesUsers) {
      this.currentPageUsers++;
      this.paginateUsers();
    } else if (type === 'permissions' && this.currentPagePermissions < this.totalPagesPermissions) {
      this.currentPagePermissions++;
      this.paginatePermissions();
    }
  }

  previousPage(type: string): void {
    if (type === 'users' && this.currentPageUsers > 1) {
      this.currentPageUsers--;
      this.paginateUsers();
    } else if (type === 'permissions' && this.currentPagePermissions > 1) {
      this.currentPagePermissions--;
      this.paginatePermissions();
    }
  }

  togglePermission(permission: any, type: string): void {
    permission[type] = !permission[type];
    console.log(
      `Permission toggled: ${type} is now ${permission[type]} for screen ${permission.screen.name}`
    );
  }
}
