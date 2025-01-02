import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {GetAllStockResponseDto} from "../../../models/stock/get-all-stock-response-dto";
import {StockStatus} from "../../../models/stock/stock";
import {Chart, registerables } from "chart.js";
import {SupplierService} from "../../../services/supplier.service";
import {CategoryService} from "../../../services/category.service";
import {WarehouseService} from "../../../services/warehouse.service";

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {
  stocks: GetAllStockResponseDto[] = [];
  criticalStocks: GetAllStockResponseDto[] = [];
  filters = {
    productName: '',
    productCode: '',
    categoryName: '',
    supplierName: '',
    warehouseName: '',
  };

  suppliers: any[] = []; // To store supplier list
  categories: any[] = []; // To store category list
  warehouses: any[] = []; // To store warehouse list

  StockStatus = StockStatus;

  private chart: Chart | null = null;

  constructor(
    private stockService: StockService,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.loadFilters();
    this.getStocks();
  }

  loadFilters(): void {
    // Fetch all suppliers
    this.supplierService.getAllSupplier().subscribe((response) => {
      this.suppliers = response;
    });

    // Fetch all categories
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response;
    });

    // Fetch all warehouses
    this.warehouseService.getAllWareHouses().subscribe((response) => {
      this.warehouses = response;
    });
  }

  getStocks(): void {
    const filterPayload = {
      productName: this.filters.productName || null,
      productCode: this.filters.productCode || null,
      categoryName: this.filters.categoryName || null,
      supplierName: this.filters.supplierName || null,
      warehouseName: this.filters.warehouseName || null,
    };

    console.log('Filter Payload:', filterPayload); // Debug the payload

    this.stockService
      .getAllSupplierWithFilter(
        this.filters.productName,
        this.filters.productCode,
        this.filters.categoryName,
        this.filters.supplierName,
        this.filters.warehouseName
      )
      .subscribe((response) => {
        console.log('Stocks:', response); // Debug the response
        this.stocks = response;
        this.filterCriticalStocks();
        this.renderStockDistributionChart();
      });
  }

  filterCriticalStocks(): void {
    this.criticalStocks = this.stocks.filter(
      (stock) => stock.status === StockStatus.CRITICAL
    );
  }

  filterStocks(): void {
    this.getStocks();
  }

  renderStockDistributionChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const aggregatedData: { label: string; quantity: number }[] = [];
    const dataMap = new Map<string, number>();

    this.stocks.forEach((stock) => {
      const key = `${stock.productName} (${stock.supplierName} - ${stock.warehouseName})`;
      if (dataMap.has(key)) {
        dataMap.set(key, dataMap.get(key)! + stock.quantity);
      } else {
        dataMap.set(key, stock.quantity);
      }
    });

    dataMap.forEach((quantity, label) => {
      aggregatedData.push({ label, quantity });
    });

    const labels = aggregatedData.map((data) => data.label);
    const quantities = aggregatedData.map((data) => data.quantity);

    this.chart = new Chart('stockDistributionChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Stok Dağılımı',
            data: quantities,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
