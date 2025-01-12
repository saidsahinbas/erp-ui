import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../../../services/supplier.service";
import {WarehouseService} from "../../../services/warehouse.service";
import {ProductService} from "../../../services/product.service";
import {OrderService} from "../../../services/order.service";
import {Supplier} from "../../../models/supplier/supplier";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {OrderCreateRequest} from "../../../models/order/order-create-request";
import {OrderStatus} from "../../../models/order/order-status";
import {OrderType} from "../../../models/order/order-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-purchasing-request-create',
  templateUrl: './purchasing-request-create.component.html',
  styleUrls: ['./purchasing-request-create.component.css']
})

export class PurchasingRequestCreateComponent implements OnInit {
  userSession: any = {}; // To hold the user session data
  suppliers: Supplier[] = [];
  warehouses: Warehouse[] = [];
  products: any[] = []; // To store products from the selected supplier
  allProducts: any[] = []; // To store all products fetched from the supplier
  selectedSupplierName: string = ''; // To store the selected supplier name
  selectedSupplierId: number = 0; // To store the selected supplier ID
  selectedWarehouse: number;
  orderLines: any[] = []; // To store selected products for the order
  orderRequest: OrderCreateRequest = {
    orderStatus: OrderStatus.PENDING,
    description: '', // Binding for the description field
    supplierId: '',
    orderLineDtoList: [],
    title: '',
    userId: 0,
    warehouseId: 0,
    orderType: OrderType.PURCHASE
  };

  isProductModalOpen = false;

  constructor(
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadWarehouses();
    const userSessionString = sessionStorage.getItem('userSession');
    if (userSessionString) {
      this.userSession = JSON.parse(userSessionString);
      this.orderRequest.userId = this.userSession.id; // Populate userId from session
    }
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
    if (!this.selectedSupplierName) {
      alert('Lütfen bir tedarikçi seçin!');
      return;
    }
    if (this.orderLines.length > 0) {
      alert('Zaten bir ürün seçtiniz. Yeni ürün seçmek için önce mevcut ürünü kaldırın.');
      return;
    }

    this.productService.getProductsBySupplier(this.selectedSupplierName).subscribe(
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
    if (this.orderLines.length > 0) {
      alert('Zaten bir ürün seçtiniz. Yeni ürün seçmek için önce mevcut ürünü kaldırın.');
      return;
    }
    this.isProductModalOpen = true;
  }

  closeProductModal(): void {
    this.isProductModalOpen = false;
  }

  addProductToOrder(product: any): void {
    if (this.orderLines.length > 0) {
      return; // Prevent adding multiple products
    }

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

    // Close the modal after selection
    this.closeProductModal();
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
  }

  createOrder(): void {
    console.log('Description:', this.orderRequest.description); // Debugging
    if (!this.selectedSupplierId || this.selectedSupplierId === 0) {
      alert('Lütfen bir tedarikçi seçin!');
      return;
    }

    this.orderRequest.supplierId = this.selectedSupplierId.toString();
    this.orderRequest.warehouseId = this.selectedWarehouse;
    this.orderRequest.orderLineDtoList = this.orderLines.map(line => ({
      productId: line.productId,
      quantity: line.quantity
    }));

    this.orderService.createOrder(this.orderRequest).subscribe(
      (response) => {
        this.resetForm();
        this.router.navigate(['purchase/approval'])
      },
      (error) => {
        console.error('Error creating order:', error);
        alert('Sipariş oluşturulamadı. Lütfen tekrar deneyin.');
      }
    );
  }


  resetForm(): void {
    this.orderRequest = {
      orderStatus: OrderStatus.PENDING,
      description: '',
      supplierId: '',
      orderLineDtoList: [],
      title: '',
      userId: this.userSession.id,
      warehouseId: 0,
      orderType: OrderType.PURCHASE
    };
    this.orderLines = [];
    this.selectedSupplierName = '';
    this.selectedSupplierId = 0;
    this.selectedWarehouse = 0;
  }

  onSupplierChange(event: Event): void {
    const selectedName = (event.target as HTMLSelectElement).value;
    const selectedSupplier = this.suppliers.find(supplier => supplier.name === selectedName);

    if (selectedSupplier) {
      this.selectedSupplierId = selectedSupplier.id;
    } else {
      this.selectedSupplierId = 0; // Reset to 0 if no supplier is selected
    }

    console.log('Selected Supplier ID:', this.selectedSupplierId); // Debugging
  }

}
