import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {StockService} from "../../../services/stock.service";
import {GetAllProductResponse} from "../../../models/product/get-all-product-response";
import {Supplier} from "../../../models/supplier/supplier";
import {WarehouseService} from "../../../services/warehouse.service";
import {Warehouse} from "../../../models/warehouse/warehouse";
import {CreateStockRequest} from "../../../models/stock/create-stock-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWarehouseId: number | null = null; // Seçilen depo ID'si
  billNumber: number | null = null; // Fiş numarası
  products: GetAllProductResponse[] = []; // Modalda gösterilecek ürünler
  selectedProducts: {
    product: GetAllProductResponse;
    supplier: string;
    quantity: number;
    criticalLevel: number;
  }[] = []; // Seçilen ürünler (ürün ve tedarikçi kombinasyonu)
  isModalOpen: boolean = false; // Modal durumu

  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllWarehouses();
  }

  // Modalı açma
  openModal(): void {
    this.isModalOpen = true;
  }

  // Modalı kapama
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Tüm ürünleri getirme ve dinamik özellik ekleme
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        selectedSupplier: null // Seçilen tedarikçi için dinamik özellik
      }));
    });
  }

  // Ürünü seçilen ürünler listesine ekleme ve modal listesini güncelleme
  addProductToList(product: GetAllProductResponse): void {
    if (!product.selectedSupplier) {
      alert('Lütfen bir tedarikçi seçin!');
      return;
    }

    // Seçilen tedarikçiyi listeden çıkar
    product.supplierNames = product.supplierNames.filter(
      supplier => supplier !== product.selectedSupplier
    );

    // Ürün ve tedarikçi kombinasyonunu seçilen listeye ekle
    const productToAdd = {
      product: { ...product },
      supplier: product.selectedSupplier,
      price: 0, // Varsayılan değer
      quantity: 0, // Varsayılan değer
      criticalLevel: 0 // Varsayılan değer
    };
    this.selectedProducts.push(productToAdd);

    // Eğer tedarikçi listesi boşaldıysa ürünü modal listesinden kaldır
    if (product.supplierNames.length === 0) {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }

  // Seçilen ürünler listesinden ürünü çıkarma ve modal listesine geri ekleme
  removeProductFromList(selectedProduct: any): void {
    this.selectedProducts = this.selectedProducts.filter(
      p =>
        !(
          p.product.id === selectedProduct.product.id &&
          p.supplier === selectedProduct.supplier
        )
    );

    const existingProduct = this.products.find(
      p => p.id === selectedProduct.product.id
    );
    if (existingProduct) {
      existingProduct.supplierNames.push(selectedProduct.supplier);
    } else {
      this.products.push({
        ...selectedProduct.product,
        supplierNames: [selectedProduct.supplier],
        selectedSupplier: null
      });
    }
  }

  // Depo listesini API'den al
  getAllWarehouses(): void {
    this.warehouseService.getAllWareHouses().subscribe(data => {
      this.warehouses = data;
    });
  }

  // Depo değiştiğinde bu fonksiyon çağrılır
  onWarehouseChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedWarehouseId = Number(target.value);
  }

  // Stokları kaydet
  saveStock(): void {
    console.log('Seçilen Ürünler:', this.selectedProducts);

    if (!this.billNumber || !this.selectedWarehouseId) {
      alert('Lütfen fiş numarasını ve depo seçimini tamamlayın!');
      return;
    }

    const invalidProducts = this.selectedProducts.filter(
      product =>
        product.quantity === null ||
        product.criticalLevel === null
    );

    if (invalidProducts.length > 0) {
      alert('Lütfen tüm ürünler için fiyat, miktar ve kritik stok değerlerini doldurun!');
      return;
    }

    const stockRequest: CreateStockRequest = {
      billNumber: this.billNumber,
      warehouse: { id: this.selectedWarehouseId } as Warehouse,
      productDetails: this.selectedProducts.map(product => ({
        productId: product.product.id,
        quantity: product.quantity,
        criticalLevel: product.criticalLevel,
        supplierName: product.supplier
      }))
    };

    console.log('Gönderilecek İstek:', stockRequest);

    this.stockService.createStock(stockRequest).subscribe(
      response => {
        alert('Stok başarıyla kaydedildi!');
        console.log(response);
        this.resetForm();
        this.router.navigate(['/stocks/management']);
      },
      error => {
        alert('Stok kaydedilirken bir hata oluştu!');
        console.error(error);
      }
    );
  }


  // Formu sıfırla
  resetForm(): void {
    this.billNumber = null;
    this.selectedWarehouseId = null;
    this.selectedProducts = [];
    this.getAllProducts();
  }
}
