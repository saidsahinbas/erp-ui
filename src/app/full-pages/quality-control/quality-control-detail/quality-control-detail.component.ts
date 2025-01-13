import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QualityControlLevelService } from "../../../services/quality-control-level.service";
import {
  QualityParameterDto,
  SampleApproveAndRejectSizeByProductDto
} from "../../../models/quality-control/sample-approve-and-reject-size-by-product-dto";
import { QualityControlResultService } from "../../../services/quality-control-result.service";
import {
  QualityTestResultInfoFromFrontendDto
} from "../../../models/quality-control/quality-test-result-info-from-frontend-dto";

interface SampleResult {
  value: string;
  isValid: boolean;
}

@Component({
  selector: 'app-quality-control-detail',
  templateUrl: './quality-control-detail.component.html',
  styleUrls: ['./quality-control-detail.component.css']
})
export class QualityControlDetailComponent implements OnInit {
  userSession: any = {};
  testData: SampleApproveAndRejectSizeByProductDto[] = [];
  orderId: number;
  isLoading = false;
  hasError = false;
  productId: number;
  pageSize = 5;
  currentPage: { [productId: number]: { [paramIndex: number]: number } } = {};
  sampleResults: { [productId: number]: { [paramIndex: number]: SampleResult[] } } = {};
  allApproved = false; // Track if all tests are approved

  standartOnay: number;
  standartRed: number;
  constructor(
    private qualityControlLevelService: QualityControlLevelService,
    private activatedRoute: ActivatedRoute,
    private qualityControlResultService: QualityControlResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.activatedRoute.snapshot.params['id']);
    if (isNaN(this.orderId)) {
      console.error('Invalid Order ID');
      this.hasError = true;
      return;
    }
    this.getTestData();
    const userSessionString = sessionStorage.getItem('userSession');
    if (userSessionString) {
      this.userSession = JSON.parse(userSessionString);
    }
  }

  getTestData() {
    this.isLoading = true;
    this.qualityControlLevelService.defineOrderQualityTest(this.orderId).subscribe(
      (res) => {
        this.testData = res;
        this.standartOnay = this.testData[0].approveSize;
        this.standartRed = this.testData[0].rejectSize;
        this.initializePagination();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading test data:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    );
  }

  initializePagination() {
    this.testData.forEach((product) => {
      this.currentPage[product.productId] = {};
      product.qualityParameters.forEach((_, paramIndex) => {
        this.currentPage[product.productId][paramIndex] = 1; // Set page 1 as default
      });
    });
  }

  getPaginatedSamples(sampleSize: number, currentPage: number): number[] {
    const startIndex = (currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, sampleSize);
    return Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);
  }

  changePage(productId: number, paramIndex: number, direction: number): void {
    this.currentPage[productId][paramIndex] += direction;
  }

  validateInput(value: string, parameter: QualityParameterDto): boolean {
    if (!value) return false;

    switch (parameter.valueType) {
      case 'RANGE':
        const numValue = parseFloat(value);
        const minValue = parseFloat(parameter.minValue);
        const maxValue = parseFloat(parameter.maxValue);
        return !isNaN(numValue) && numValue >= minValue && numValue <= maxValue;

      case 'STRING':
        return value.toUpperCase() === parameter.defaultValue?.toUpperCase();

      case 'NUMBER':
        return parseFloat(value) === parseFloat(parameter.defaultValue);

      default:
        return false;
    }
  }

  onResultInput(event: Event, product: SampleApproveAndRejectSizeByProductDto, parameter: QualityParameterDto, sampleIndex: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!this.sampleResults[product.productId]) {
      this.sampleResults[product.productId] = {};
    }
    if (!this.sampleResults[product.productId][parameter.id]) {
      this.sampleResults[product.productId][parameter.id] = Array(product.sampleSize).fill({ value: '', isValid: false });
    }

    this.sampleResults[product.productId][parameter.id][sampleIndex] = {
      value: value,
      isValid: this.validateInput(value, parameter)
    };

    this.updateCounts(product);
  }

  updateCounts(product: SampleApproveAndRejectSizeByProductDto) {
    let approveCount = 0;
    let rejectCount = 0;

    product.qualityParameters.forEach((param) => {
      const results = this.sampleResults[product.productId]?.[param.id] || [];
      results.forEach((result) => {
        if (result.value) {
          result.isValid ? approveCount++ : rejectCount++;
        }
      });
    });

    product.approveSize = approveCount;
    product.rejectSize = rejectCount;
  }

  calculateTotalApproveCount(): number {
    return this.testData.reduce((sum, product) => sum + product.approveSize, 0);
  }

  calculateTotalRejectCount(): number {
    return this.testData.reduce((sum, product) => sum + product.rejectSize, 0);
  }

  getValidationClass(product: SampleApproveAndRejectSizeByProductDto, parameter: QualityParameterDto, sampleIndex: number): string {
    const result = this.sampleResults[product.productId]?.[parameter.id]?.[sampleIndex];
    if (!result?.value) return '';
    return result.isValid ? 'border-green-500' : 'border-red-500';
  }

  getPageCount(sampleSize: number): number {
    return Math.ceil(sampleSize / this.pageSize);
  }

  setAllTestResultsTrue(): void {
    this.allApproved = true;
    this.testData.forEach((product) => {
      product.qualityParameters.forEach((parameter) => {
        const results = this.sampleResults[product.productId]?.[parameter.id] || [];
        results.forEach((result) => {
          result.value = parameter.defaultValue || 'Başarılı';
          result.isValid = true;
        });
      });
      product.approveSize = product.sampleSize;
      product.rejectSize = 0;
    });
  }

  saveResults(): void {
    const calculatedApproveCount = this.calculateTotalApproveCount();
    const calculatedRejectCount = this.calculateTotalRejectCount();

    // Test sonuçlarının doğruluğunu kontrol et
    const testResult =
      calculatedRejectCount <= this.standartRed &&
      calculatedApproveCount >= this.standartOnay;

    const resultDto = new QualityTestResultInfoFromFrontendDto(
      this.orderId,
      testResult,
      this.productId = this.testData[0].productId,
      this.userSession.id
    );

    // Sonuçları backende gönder
    this.qualityControlResultService.saveResult(resultDto).subscribe(
      () => {
        this.router.navigate(['/quality/results']); // Başarıyla kaydedildiğinde yönlendirme
      },
      (error) => {
        console.error('Error saving results:', error);
      }
    );
  }
}
