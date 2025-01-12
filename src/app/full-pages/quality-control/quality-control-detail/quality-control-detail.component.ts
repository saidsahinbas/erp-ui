import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {QualityControlLevelService} from "../../../services/quality-control-level.service";
import {
  SampleApproveAndRejectSizeByProductDto
} from "../../../models/quality-control/sample-approve-and-reject-size-by-product-dto";

@Component({
  selector: 'app-quality-control-detail',
  templateUrl: './quality-control-detail.component.html',
  styleUrls: ['./quality-control-detail.component.css']
})
export class QualityControlDetailComponent implements OnInit {
  testData: SampleApproveAndRejectSizeByProductDto[] = [];
  orderId: number;
  isLoading = false; // To show a loading spinner if needed
  hasError = false; // To handle and display errors
  pageSize = 10; // Number of rows per page
  currentPage: { [productId: number]: { [paramIndex: number]: number } } = {};

  constructor(
    private qualityControlLevelService: QualityControlLevelService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the order ID from the route parameters
    this.orderId = Number(this.activatedRoute.snapshot.params['id']);
    if (isNaN(this.orderId)) {
      console.error('Invalid Order ID');
      this.hasError = true;
      return;
    }
    this.getTestData();
  }

  getTestData() {
    this.qualityControlLevelService.defineOrderQualityTest(this.orderId).subscribe((res) => {
      this.testData = res;

      // Initialize pagination states
      this.testData.forEach((product, productIndex) => {
        this.currentPage[product.productId] = {};
        product.qualityParameters.forEach((_, paramIndex) => {
          this.currentPage[product.productId][paramIndex] = 1; // Set page 1 as default
        });
      });
    });
  }

// Helper to paginate rows
  getPaginatedSamples(sampleSize: number, currentPage: number): number[] {
    const startIndex = (currentPage - 1) * this.pageSize;
    return Array.from({ length: this.pageSize }, (_, i) => startIndex + i).slice(0, sampleSize - startIndex);
  }

// Change page for a product and parameter
  changePage(productId: number, paramIndex: number, direction: number): void {
    this.currentPage[productId][paramIndex] += direction;
  }

// Calculate approve and reject counts
  calculateApproveCount(product: SampleApproveAndRejectSizeByProductDto): number {
    // Implement logic to calculate approved results based on inputs
    return 0;
  }

  calculateRejectCount(product: SampleApproveAndRejectSizeByProductDto): number {
    // Implement logic to calculate rejected results based on inputs
    return 0;
  }

// Helper to get total page count
  getPageCount(sampleSize: number): number {
    return Math.ceil(sampleSize / this.pageSize);
  }
}
