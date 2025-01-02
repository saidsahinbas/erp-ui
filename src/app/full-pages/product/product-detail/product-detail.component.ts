import { Component, OnInit } from '@angular/core';
import {GetSingleProductResponse} from "../../../models/product/get-single-product-response";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {QualityParameter} from "../../../models/quality-parameter/quality-parameter";
import {QualityParameterService} from "../../../services/quality-parameter.service";
import {DocumentService} from "../../../services/document.service";
import {Document} from "../../../models/document/document";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: GetSingleProductResponse | null = null;
  sanitizedImage1: SafeUrl | null = null;
  sanitizedImage2: SafeUrl | null = null;
  documents: Document[];
  qualityParameters: QualityParameter[];
  status: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private qualityParameterService: QualityParameterService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProductData();
    this.loadAllDocuments();
    this.loadAllQualityParameters();
  }

  loadProductData(): void {
    this.productService.getSinglePrdouct(this.productId!).subscribe(
      (res: GetSingleProductResponse) => {
        this.product = res;

        // Eğer productStatuses undefined ise boş bir dizi olarak ayarla
        this.product.productStatuses = this.product.productStatuses || [];

        console.log(this.product);

        if (this.product.image1) {
          this.sanitizedImage1 = this.sanitizer.bypassSecurityTrustUrl(this.product.image1);
        }
        if (this.product.image2) {
          this.sanitizedImage2 = this.sanitizer.bypassSecurityTrustUrl(this.product.image2);
        }
      },
      (error) => {
        console.error("Resim yükleme hatası:", error);
      }
    );
  }


  private loadAllDocuments() {
    this.documentService.getAllDocumentsByProductId(this.productId!).subscribe((res) => {
      this.documents = res;
      console.log(this.documents);
    })
  }

  private loadAllQualityParameters() {
    this.qualityParameterService.getAllQualityParametersByProduct(this.productId).subscribe((res) => {
      this.qualityParameters = res;
      console.log(this.qualityParameters);
    })
  }

  enableEditMode(): void {
    // Açılır pencere veya düzenleme alanları için mantık
  }

  generateBase64DownloadUrl(base64Content: string, fileName: string): string {
    const mimeType = this.getMimeTypeFromFileName(fileName); // Dosya türünü belirle
    return `data:${mimeType};base64,${base64Content}`;
  }

  getMimeTypeFromFileName(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }

  downloadDocument(base64Content: string | ArrayBuffer, fileName: string): void {
    let byteCharacters: string;

    // base64Content'in türü string mi kontrol et
    if (typeof base64Content === 'string') {
      byteCharacters = atob(base64Content);
    } else {
      // Eğer ArrayBuffer ise hata fırlatabiliriz ya da işlenmemiş olarak devam edebiliriz
      console.error('ArrayBuffer türü desteklenmiyor');
      return;
    }

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Blob oluştur ve indir
    const mimeType = this.getMimeTypeFromFileName(fileName);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    // URL'yi serbest bırak
    window.URL.revokeObjectURL(url);
  }

}
