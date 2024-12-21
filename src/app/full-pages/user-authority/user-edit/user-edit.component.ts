import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {AuthorityService} from "../../../services/authority.service";
import {AuthorityGroup} from "../../../models/authority-group";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  users: User[] = []; // List of all users
  paginatedUsers: User[] = []; // Current page users
  currentPageUsers = 1; // Current pagination page
  itemsPerPage = 10; // Number of items per page
  totalPagesUsers: number; // Total number of pages
  pagesUsers: number[] = []; // Array of page numbers

  showModal = false; // Modal visibility
  selectedUser: User | null = null; // Currently selected user

  constructor(
    private userService: UserService,
    private authorityService: AuthorityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        this.users = res; // Assign the users response
        this.calculatePagination(); // Calculate pagination
        this.paginateData(); // Paginate data for the current page
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  // Calculate pagination details
  calculatePagination(): void {
    this.totalPagesUsers = Math.ceil(this.users.length / this.itemsPerPage);
    this.pagesUsers = Array.from(
      { length: this.totalPagesUsers },
      (_, i) => i + 1
    );
  }

  // Paginate users for the current page
  paginateData(): void {
    const startIndex = (this.currentPageUsers - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPageUsers > 1) {
      this.currentPageUsers--;
      this.paginateData();
    }
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPageUsers < this.totalPagesUsers) {
      this.currentPageUsers++;
      this.paginateData();
    }
  }

  // Navigate to a specific page
  goToPage(pageNumber: number): void {
    this.currentPageUsers = pageNumber;
    this.paginateData();
  }

  // Open the delete modal
  openDeleteModal(user: User): void {
    this.selectedUser = user;
    this.showModal = true;
  }

  // Close the delete modal
  closeModal(): void {
    this.selectedUser = null;
    this.showModal = false;
  }

  // Delete a user
  deleteUser(userId: number | undefined): void {
    if (userId) {
      this.userService.deleteUser(userId).subscribe(
        (response: string) => {
          console.log(response); // Logs "User deleted successfully"
          this.users = this.users.filter((user) => user.id !== userId);
          this.calculatePagination();
          this.paginateData();
          this.closeModal();

          // Reload the page after deleting the user
          this.router.navigateByUrl('/manage-user', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
          });
        },
        (error) => {
          console.error('Failed to delete user:', error);
        }
      );
    }
  }
}
