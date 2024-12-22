import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../services/authority.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {RolePermissionService} from "../../../services/role-permission.service";
import {AuthorityGroupUpdateRequest} from "../../../models/authority-group-update-request";

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
  allUsers: any[] = [];
  selectedUsersToAdd: number[] = [];
  isEditingPermissions: boolean = false;

  showAddUserModal: boolean = false;
  showRemoveUserModal: boolean = false;
  userToRemove: any = null;

  // Pagination variables for users
  currentPageUsers: number = 1;
  usersPerPage: number = 5;
  paginatedUsers: any[] = [];
  totalPagesUsers: number = 0;
  pagesUsers: number[] = [];

  // Pagination variables for permissions
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
    this.loadAllUsers();
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

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (res) => (this.allUsers = res),
      (error) => console.error('Error fetching all users:', error)
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


  //TODO gelebilir
  togglePermission(permission: any, type: string): void {
    if (this.isEditingPermissions) {
      permission[type] = !permission[type];
    }
  }

  enableEditingPermissions(): void {
    this.isEditingPermissions = true;
  }

  savePermissions(): void {
    const updateRequest: AuthorityGroupUpdateRequest = {
      id: this.authorityId,
      groupName: this.authorityDetails.name,
      rolePermissionItems: this.rolePermissions.map(permission => ({
        screenId: permission.screen.id,
        read: permission.read,
        create: permission.create,
        update: permission.update,
        delete: permission.delete
      }))
    };

    this.authorityService.updateAuthorityGroup(updateRequest).subscribe(
      () => {
        this.isEditingPermissions = false;
        this.loadRolePermissions();
        console.log('Permissions saved successfully');
      },
      (error) => console.error('Error saving permissions:', error)
    );
  }

  cancelEditingPermissions(): void {
    this.isEditingPermissions = false;
    this.loadRolePermissions();
  }

  openAddUserModal(): void {
    this.selectedUsersToAdd = [];
    this.showAddUserModal = true;
  }

  addSelectedUsers(): void {
    const addUserRequest = {
      id: this.authorityId,
      userIds: this.selectedUsersToAdd
    };

    this.authorityService.addUserToAuthorityGroup(addUserRequest).subscribe(
      () => {
        this.loadUsers();
        this.showAddUserModal = false;
        this.selectedUsersToAdd = [];
      },
      (error) => console.error('Error adding users:', error)
    );
  }

  confirmRemoveUser(user: any): void {
    this.userToRemove = user;
    this.showRemoveUserModal = true;
  }

  removeUser(): void {
    if (this.userToRemove) {
      const removeUserRequest = {
        id: this.authorityId,
        userId: this.userToRemove.id
      };

      this.authorityService.removeUserFromAuthorityGroup(removeUserRequest).subscribe(
        () => {
          this.loadUsers();
          this.showRemoveUserModal = false;
          this.userToRemove = null;
        },
        (error) => console.error('Error removing user:', error)
      );
    }
  }

  closeModal(): void {
    this.showAddUserModal = false;
    this.showRemoveUserModal = false;
    this.userToRemove = null;
  }

  toggleSelectUser(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!this.selectedUsersToAdd.includes(id)) {
        this.selectedUsersToAdd.push(id);
      }
    } else {
      this.selectedUsersToAdd = this.selectedUsersToAdd.filter(userId => userId !== id);
    }
  }
}
