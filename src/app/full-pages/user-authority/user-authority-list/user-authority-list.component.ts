import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../services/authority.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-authority-list',
  templateUrl: './user-authority-list.component.html',
  styleUrls: ['./user-authority-list.component.css']
})
export class UserAuthorityListComponent implements OnInit {
  authorities: { id: number; name: string }[] = []; // Full list of authorities
  paginatedAuthorities: { id: number; name: string }[] = []; // Paginated authorities
  currentPage = 1; // Current page
  itemsPerPage = 10; // Number of items per page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Page numbers for pagination

  constructor(
    private authorityService: AuthorityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllAuthorities();
  }

  loadAllAuthorities(): void {
    this.authorityService.getAllAuthorities().subscribe(
      (res) => {
        this.authorities = res;
        this.calculatePagination();
        this.paginateData();
      },
      (error) => {
        console.error('Error fetching authority groups:', error);
      }
    );
  }

  // Calculate the total number of pages and page numbers
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.authorities.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Paginate the data for the current page
  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAuthorities = this.authorities.slice(startIndex, endIndex);
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  // Navigate to a specific page
  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginateData();
  }

  // Navigate to the authority details page
  navigateToDetails(authorityId: number): void {
    this.router.navigate(['/user-authority-detail', authorityId]);
  }

  // Handle add/remove users action
  handleAddRemoveUsers(authorityId: number): void {
    alert(`Add/Remove Users for Authority ID: ${authorityId}`);
  }

  // Handle edit permissions action
  handleEditPermissions(authorityId: number): void {
    alert(`Edit Permissions for Authority ID: ${authorityId}`);
  }
}
