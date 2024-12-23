import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product/product";
import {GetAllProductResponse} from "../../../models/product/get-all-product-response";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: GetAllProductResponse[] = [];
  paginatedProducts: GetAllProductResponse[] = []; // Holds the products for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  totalPages: number = 1; // Total number of pages
  pages: number[] = []; // Array of page numbers

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }
}
