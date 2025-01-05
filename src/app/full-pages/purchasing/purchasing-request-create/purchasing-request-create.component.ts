import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../../services/supplier.service";
import {WarehouseService} from "../../../services/warehouse.service";
import {ProductService} from "../../../services/product.service";
import {OrderService} from "../../../services/order.service";
import {Supplier} from "../../../models/supplier/supplier";
import {Warehouse} from "../../../models/warehouse/warehouse";

@Component({
  selector: 'app-purchasing-request-create',
  templateUrl: './purchasing-request-create.component.html',
  styleUrls: ['./purchasing-request-create.component.css']
})

export class PurchasingRequestCreateComponent implements OnInit {
  suppliers: Supplier[] = [];
  warehouses: Warehouse[] = [];
  products: any[] = []; // To store products from the selected supplier
  allProducts: any[] = []; // To store all products fetched from the supplier
  selectedSupplier: string = '';
  selectedWarehouse: number;
  orderLines: any[] = []; // To store selected products for the order
  orderRequest = {
    orderStatus: 'PENDING',
    description: '', // Binding for the description field
    supplierId: '',
    orderLineList: [],
    title: '',
    userId: 1,
    warehouseId: 0,
    orderType: 'PURCHASE'
  };

  isProductModalOpen = false;

  constructor(
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadWarehouses();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe((data) => {
      this.suppliers = data;
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getAllWareHouses().subscribe((data) => {
      this.warehouses = data;
    });
  }

  loadProductsBySupplier(): void {
    if (!this.selectedSupplier) {
      alert('Lütfen bir tedarikçi seçin!');
      return;
    }
    this.productService.getProductsBySupplier(this.selectedSupplier).subscribe(
      (data) => {
        this.allProducts = data.products; // Store all fetched products
        this.products = this.filterProducts(data.products); // Filter out already selected products
        this.openProductModal();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(products: any[]): any[] {
    // Exclude products already added to orderLines
    return products.filter(product =>
      !this.orderLines.some(line => line.productId === product.productId)
    );
  }

  openProductModal(): void {
    this.isProductModalOpen = true;
  }

  closeProductModal(): void {
    this.isProductModalOpen = false;
  }

  addProductToOrder(product: any): void {
    // Add the product to the orderLines
    const orderLine = {
      productId: product.productId,
      productName: product.productName,
      categoryName: product.categoryName,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      quantity: 1 // Default quantity
    };
    this.orderLines.push(orderLine);

    // Remove the product from the modal list
    this.products = this.filterProducts(this.allProducts);
  }

  removeProductFromOrder(index: number): void {
    // Add the product back to the modal list
    const removedProduct = this.orderLines[index];
    const productToAddBack = {
      productId: removedProduct.productId,
      productName: removedProduct.productName,
      categoryName: removedProduct.categoryName,
      purchasePrice: removedProduct.purchasePrice,
      salePrice: removedProduct.salePrice
    };
    this.products.push(productToAddBack);

    // Remove the product from the orderLines
    this.orderLines.splice(index, 1);

    // Refresh the modal product list
    this.products = this.filterProducts(this.allProducts);
  }
}
