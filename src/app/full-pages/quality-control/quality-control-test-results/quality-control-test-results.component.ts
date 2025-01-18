import { Component, OnInit } from '@angular/core';
import {QualityControlResultService} from "../../../services/quality-control-result.service";
import {Router} from "@angular/router";
import {QualityControlResultList} from "../../../models/quality-control/result/quality-control-result-list";

@Component({
  selector: 'app-quality-control-test-results',
  templateUrl: './quality-control-test-results.component.html',
  styleUrls: ['./quality-control-test-results.component.css']
})
export class QualityControlTestResultsComponent implements OnInit {
  currentPage: number = 1; // Default page is 1
  itemsPerPage: number = 10; // Default items per page
  totalPages: number = 0; // Total number of pages
  totalRecords: number = 0; // Total number of records
  allResults: QualityControlResultList[] = []; // Full list of results
  paginatedResults: QualityControlResultList[] = []; // Results for the current page

  constructor(
    private qualityControlResultService: QualityControlResultService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadAllResults(); // Fetch all results
  }

  loadAllResults(): void {
    this.qualityControlResultService.getAllResults().subscribe((res: QualityControlResultList[]) => {
      this.allResults = res;
      this.totalRecords = res.length;
      this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
      this.updatePaginatedResults(); // Load the first page
    });
  }

  updatePaginatedResults(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResults = this.allResults.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedResults();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedResults();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePaginatedResults();
  }
}
