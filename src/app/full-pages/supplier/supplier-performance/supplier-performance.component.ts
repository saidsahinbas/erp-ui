import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupplierService } from '../../../services/supplier.service';
import { ProductService } from '../../../services/product.service';
import { PredictionService } from '../../../services/prediction-service';
import {
  PredictionResponse,
  SupplierResponse,
  ProductResponse,
  ConsolidatedResponse
} from '../../../models/prediction/prediction-response';
import { GetAllProductResponse } from '../../../models/product/get-all-product-response';
import { Supplier } from '../../../models/supplier/supplier';

@Component({
  selector: 'app-supplier-performance',
  templateUrl: './supplier-performance.component.html',
  styleUrls: ['./supplier-performance.component.css'],
})
export class SupplierPerformanceComponent implements OnInit, AfterViewInit {
  allProducts: GetAllProductResponse[] = [];
  allSuppliers: Supplier[] = [];
  predictions: PredictionResponse[] = [];
  selectedProduct = '';
  selectedSupplier = '';
  isLoading = false;
  showWelcomeModal = true;
  showNoDataMessage = false;
  private chart: Chart | null = null;

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private predictionService: PredictionService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadAllProducts();
    this.loadAllSuppliers();
  }

  ngAfterViewInit(): void {
    // We don't call renderChart here anymore since we want to wait for user input
  }

  closeWelcomeModal() {
    this.showWelcomeModal = false;
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((res: GetAllProductResponse[]) => {
      this.allProducts = res;
    });
  }

  loadAllSuppliers() {
    this.supplierService.getAllSupplier().subscribe((res: Supplier[]) => {
      this.allSuppliers = res;
    });
  }

  fetchPrediction(productId?: number, supplierId?: number): void {
    this.isLoading = true;
    this.showNoDataMessage = false;

    this.predictionService.getPrediction({ productId, supplierId }).subscribe({
      next: (data: PredictionResponse[]) => {
        this.predictions = data;
        this.isLoading = false;

        if (this.predictions.length === 0) {
          this.showNoDataMessage = true;
        } else {
          this.renderChart();
        }
      },
      error: (err) => {
        console.error('Error fetching predictions', err);
        this.isLoading = false;
        this.showNoDataMessage = true;
      },
    });
  }

  canApplyFilters(): boolean {
    return !!(this.selectedProduct || this.selectedSupplier);
  }

  applyFilters() {
    if (!this.canApplyFilters()) {
      return;
    }

    const productId = this.selectedProduct ? parseInt(this.selectedProduct) : undefined;
    const supplierId = this.selectedSupplier ? parseInt(this.selectedSupplier) : undefined;
    this.fetchPrediction(productId, supplierId);
  }

  isSupplierResponse(prediction: PredictionResponse): prediction is SupplierResponse {
    return 'supplier_name' in prediction;
  }

  isProductResponse(prediction: PredictionResponse): prediction is ProductResponse {
    return 'product_name' in prediction;
  }

  isConsolidatedResponse(prediction: PredictionResponse): prediction is ConsolidatedResponse {
    return 'order_status_1' in prediction;
  }

  getDisplayName(prediction: PredictionResponse): string {
    if (this.isSupplierResponse(prediction)) {
      return prediction.supplier_name;
    }
    if (this.isProductResponse(prediction)) {
      return prediction.product_name;
    }
    return 'Consolidated';
  }

  calculateSuccessRate(prediction: PredictionResponse): number {
    return (prediction.success_sample_size / prediction.sample_size) * 100;
  }

  renderChart(): void {
    const ctx = document.getElementById('performance-chart') as HTMLCanvasElement;

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.predictions.map(prediction => this.getDisplayName(prediction)),
          datasets: [
            {
              label: 'Örnek Başarı Oranı (%)',
              data: this.predictions.map(prediction => this.calculateSuccessRate(prediction)),
              backgroundColor: this.predictions.map((prediction) =>
                prediction.predicted_label === 'Avoid Collaboration'
                  ? '#F44336'
                  : prediction.predicted_label === 'Monitor Closely'
                    ? '#FF9800'
                    : '#4CAF50'
              ),
              borderWidth: 1,
            },
            {
              label: 'Toplam Başarı Oranı (%)',
              data: this.predictions.map(prediction =>
                (prediction.total_success_order_count / prediction.total_order_count) * 100
              ),
              type: 'line',
              borderColor: '#2196F3',
              borderWidth: 2,
              fill: false
            }
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Tedarikçiler/Ürünler' } },
            y: {
              max: 100,
              title: { display: true, text: 'Başarı Oranı (%)' },
              beginAtZero: true
            },
          },
        },
      });
    }
  }

  getTranslatedLabel(predictedLabel: string): string {
    switch (predictedLabel) {
      case 'Avoid Collaboration':
        return 'Çalışılması Önerilmez';
      case 'Monitor Closely':
        return 'Yakından Takip Edilmeli';
      case 'Recommended Supplier':
        return 'Önerilen Tedarikçi';
      default:
        return predictedLabel; // Varsayılan olarak orijinal etiketi döndür
    }
  }

}
