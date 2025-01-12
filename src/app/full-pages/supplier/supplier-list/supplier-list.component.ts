import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";
import {Supplier} from "../../../models/supplier/supplier";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  paginatedSuppliers: Supplier[] = []; // Holds the suppliers for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  totalPages: number = 1; // Total number of pages
  pages: number[] = []; // Array of page numbers

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe(
      (res) => {
        this.suppliers = res;
        this.calculatePagination();
      }
    );
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.suppliers.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedSuppliers();
  }

  updatePaginatedSuppliers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedSuppliers = this.suppliers.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedSuppliers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSuppliers();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedSuppliers();
  }

  navigateSupplierCreate(): void {
    this.router.navigate(['/suppliers/create']);
  }

}
