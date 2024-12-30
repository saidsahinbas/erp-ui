import { Component, OnInit } from '@angular/core';
import {ProductStatus} from "../../../models/product/product-status";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {SupplierService} from "../../../services/supplier.service";
import {Category} from "../../../models/category/category";
import {Supplier} from "../../../models/supplier/supplier";
import {ProductCreateRequest} from "../../../models/product/product-create-request";
import {QualityParameter} from "../../../models/quality-parameter/quality-parameter";
import {QualityParameterService} from "../../../services/quality-parameter.service";
import {Document} from "../../../models/document/document";
import {DocumentType} from "../../../models/document/document-type";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  base64Images: string[] = [];
  errorMessage: string | null = null;
  productStatusKeys: ProductStatus[] = Object.values(ProductStatus) as ProductStatus[];
  selectedStatuses: ProductStatus[] = [];

  showQualityParametersModal = false;
  showEditQualityParameterModal = false;
  qualityParameters: QualityParameter[] = [];
  selectedQualityParameters: QualityParameter[] = [];
  selectedQualityParameterIds: number[] = [];
  editingQualityParameter: QualityParameter | null = null;

  showSupplierModal = false;
  suppliers: Supplier[] = [];
  selectedSupplierIds: number[] = [];
  selectedSupplierNames: string[] = [];

  uploadedDocuments: Document[] = []; // Documents array for uploaded files

  productStatusLabels: Record<ProductStatus, string> = {
    [ProductStatus.SATISTA]: 'Satışta',
    [ProductStatus.TEDARIK_EDILIYOR]: 'Tedarik Ediliyor',
    [ProductStatus.AKTIF]: 'Aktif',
    [ProductStatus.PASIF]: 'Pasif',
    [ProductStatus.ENVANTERE_DAHIL]: 'Envantere Dahil',
    [ProductStatus.URETILIYOR]: 'Üretiliyor',
  };

  categories: Category[] = [];
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
    image2: '',
    documents: [],
    qualityParameterDtoSet: []
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private qualityParameterService: QualityParameterService
  ) {}

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllSuppliers();
    this.loadQualityParameters();
  }

  // Handle file selection for images
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

  // Handle file selection for documents
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      Array.from(target.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const documentType = this.getDocumentType(file.type);
          if (documentType) { // Ensure the type is valid
            this.uploadedDocuments.push({
              name: file.name,
              content: e.target.result.split(',')[1], // Base64 content without MIME prefix
              type: documentType,
            });
          } else {
            console.error(`Unsupported file type: ${file.type}`);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  }

// Map MIME type to DocumentType
  getDocumentType(fileType: string): DocumentType | null {
    const mimeTypeMapping: Record<string, DocumentType> = {
      'application/pdf': DocumentType.PDF,
      'text/plain': DocumentType.TEXT,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': DocumentType.DOCX,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': DocumentType.XLSX,
    };
    return mimeTypeMapping[fileType] || null;
  }


  // Remove document from the list
  removeDocument(index: number): void {
    if (index >= 0 && index < this.uploadedDocuments.length) {
      this.uploadedDocuments.splice(index, 1);
    }
  }


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

  isConflictingStatus(status: ProductStatus): boolean {
    const conflicts: Record<ProductStatus, ProductStatus[]> = {
      [ProductStatus.AKTIF]: [ProductStatus.PASIF],
      [ProductStatus.PASIF]: [ProductStatus.AKTIF],
      [ProductStatus.ENVANTERE_DAHIL]: [],
      [ProductStatus.TEDARIK_EDILIYOR]: [],
      [ProductStatus.SATISTA]: [],
      [ProductStatus.URETILIYOR]: [],
    };

    return conflicts[status]?.some(conflict => this.selectedStatuses.includes(conflict));
  }

  private loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  private loadAllSuppliers(): void {
    this.supplierService.getAllSupplier().subscribe((res) => {
      this.suppliers = res;
    });
  }

  openSupplierModal(): void {
    this.showSupplierModal = true;
  }

  closeSupplierModal(): void {
    this.showSupplierModal = false;
  }

  onSupplierChange(event: Event, supplierId: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSupplierIds.push(supplierId);
    } else {
      this.selectedSupplierIds = this.selectedSupplierIds.filter(id => id !== supplierId);
    }
  }

  saveSelectedSuppliers(): void {
    this.selectedSupplierNames = this.suppliers
      .filter(supplier => this.selectedSupplierIds.includes(supplier.id))
      .map(supplier => supplier.name);
    this.closeSupplierModal();
  }

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
      status => backendStatusMapping[status]
    );

    this.productRequest.image1 = this.base64Images[0] || '';
    this.productRequest.image2 = this.base64Images[1] || '';
    this.productRequest.supplierId = this.selectedSupplierIds;

    // Include uploaded documents
    this.productRequest.documents = this.uploadedDocuments;
    this.productRequest.qualityParameterDtoSet = this.selectedQualityParameters;

    this.productService.createProduct(this.productRequest).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  loadQualityParameters(): void {
    this.qualityParameterService.getAllQualityParameters().subscribe((params) => {
      this.qualityParameters = params;
    });
  }

  openQualityParameterModal(): void {
    this.showQualityParametersModal = true;
  }

  closeQualityParametersModal(): void {
    this.showQualityParametersModal = false;
  }

  editQualityParameter(parameter: QualityParameter): void {
    this.editingQualityParameter = { ...parameter };
    this.showEditQualityParameterModal = true;
  }

  saveEditedQualityParameter(): void {
    if (this.editingQualityParameter) {
      this.qualityParameterService.createQualityParameter(this.editingQualityParameter)
        .subscribe(newParam => {
          const index = this.qualityParameters.findIndex(param => param.id === newParam.id);
          if (index > -1) {
            this.qualityParameters[index] = newParam;
          } else {
            this.qualityParameters.push(newParam);
          }
          this.closeEditQualityParameterModal();
        });
    }
  }

  closeEditQualityParameterModal(): void {
    this.showEditQualityParameterModal = false;
    this.editingQualityParameter = null;
  }

  onQualityParameterChange(event: Event, parameter: QualityParameter): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedQualityParameters.push(parameter);
      this.selectedQualityParameterIds.push(parameter.id);
    } else {
      this.selectedQualityParameters = this.selectedQualityParameters.filter(
        p => p.id !== parameter.id
      );
      this.selectedQualityParameterIds = this.selectedQualityParameterIds.filter(
        id => id !== parameter.id
      );
    }
  }

  saveSelectedQualityParameters(): void {
    this.closeQualityParametersModal();
    console.log('Selected Quality Parameters:', this.selectedQualityParameters);
  }
}
