import { Component, OnInit } from '@angular/core';
import {ProductStatus} from "../../../models/product/product-status";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {SupplierService} from "../../../services/supplier.service";
import {Category} from "../../../models/category/category";
import {Supplier} from "../../../models/supplier/supplier";
import {ProductCreateRequest} from "../../../models/product/product-create-request";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  base64Images: string[] = [];
  errorMessage: string | null = null;
  productStatusKeys: ProductStatus[] = Object.values(ProductStatus) as ProductStatus[]; // Enum values
  selectedStatuses: ProductStatus[] = []; // Selected statuses

  productStatusLabels: Record<ProductStatus, string> = {
    [ProductStatus.SATISTA]: 'Satışta',
    [ProductStatus.TEDARIK_EDILIYOR]: 'Tedarik Ediliyor',
    [ProductStatus.AKTIF]: 'Aktif',
    [ProductStatus.PASIF]: 'Pasif',
    [ProductStatus.ENVANTERE_DAHIL]: 'Envantere Dahil',
    [ProductStatus.URETILIYOR]: 'Üretiliyor',
  };

  categories: Category[] = [];
  suppliers: Supplier[] = [];
  selectedSupplierIds: number[] = []; // Holds selected supplier IDs
  selectedSupplierNames: string[] = []; // Holds selected supplier names
  showModal: boolean = false; // Controls modal visibility


  productRequest: ProductCreateRequest = {
    name: '',
    code: '',
    purchasePrice: 0,
    salePrice: 0,
    description: '',
    categoryId: 0,
    supplierId: [],
    productStatuses: [],
    image1: '',
    image2: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllSuppliers();
  }

  // Handle file uploads and convert to Base64
  onFilesSelected(event: any): void {
    const files = event.target.files;

    if (files.length + this.base64Images.length > 2) {
      this.errorMessage = 'En fazla 2 görsel yükleyebilirsiniz.';
      return;
    }

    this.errorMessage = null;

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.base64Images.push(e.target.result);

        if (this.base64Images.length > 2) {
          this.base64Images = this.base64Images.slice(0, 2);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Toggle the selection of product statuses
  toggleStatus(status: ProductStatus): void {
    const index = this.selectedStatuses.indexOf(status);

    if (index !== -1) {
      this.selectedStatuses.splice(index, 1);
      return;
    }

    if (this.isConflictingStatus(status)) {
      this.errorMessage = `${this.productStatusLabels[status]} seçildiğinde çakışan durumlar seçilemez.`;
      return;
    }

    this.selectedStatuses.push(status);
    this.errorMessage = null;
  }

  // Check if the selected status conflicts with others
  isConflictingStatus(status: ProductStatus): boolean {
    const conflicts: Record<ProductStatus, ProductStatus[]> = {
      [ProductStatus.AKTIF]: [ProductStatus.PASIF],
      [ProductStatus.PASIF]: [ProductStatus.AKTIF],
      [ProductStatus.ENVANTERE_DAHIL]: [],
      [ProductStatus.TEDARIK_EDILIYOR] : [],
      [ProductStatus.SATISTA]: [],
      [ProductStatus.URETILIYOR]: [],
    };

    return conflicts[status]?.some((conflict) =>
      this.selectedStatuses.includes(conflict)
    );
  }

  // Load all categories
  private loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  // Load all suppliers
  private loadAllSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe((res) => {
      this.suppliers = res;
    });
  }

  openSupplierModal(): void {
    this.showModal = true;
  }

  closeSupplierModal(): void {
    this.showModal = false;
  }

  onSupplierChange(event: Event, supplierId: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSupplierIds.push(supplierId);
    } else {
      this.selectedSupplierIds = this.selectedSupplierIds.filter(
        (id) => id !== supplierId
      );
    }
  }

  saveSelectedSuppliers(): void {
    this.selectedSupplierNames = this.suppliers
      .filter((supplier) => this.selectedSupplierIds.includes(supplier.id))
      .map((supplier) => supplier.name);
    this.closeSupplierModal();
  }

  // Save the product using the backend service
  saveProduct(): void {
    const backendStatusMapping: Record<string, string> = {
      'Satışta': 'SATISTA',
      'Tedarik Ediliyor': 'TEDARIK_EDILIYOR',
      'Aktif': 'AKTIF',
      'Pasif': 'PASIF',
      'Envantere Dahil': 'ENVANTERE_DAHIL',
      'Üretiliyor': 'URETILIYOR',
    };

    this.productRequest.productStatuses = this.selectedStatuses.map(
      (status) => backendStatusMapping[status] // Backend'e uygun enum değerini alın
    );

    this.productRequest.image1 = this.base64Images[0] || '';
    this.productRequest.image2 = this.base64Images[1] || '';
    this.productRequest.supplierId = this.selectedSupplierIds;

    this.productService.createProduct(this.productRequest).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

}
