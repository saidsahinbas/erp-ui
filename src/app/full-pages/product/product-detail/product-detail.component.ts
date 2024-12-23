import { Component, OnInit } from '@angular/core';
import {GetSingleProductResponse} from "../../../models/product/get-single-product-response";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number | null = null;
  product: GetSingleProductResponse | null = null;
  sanitizedImage1: SafeUrl | null = null;
  sanitizedImage2: SafeUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProductData();
  }

  loadProductData(): void {
    this.productService.getSinglePrdouct(this.productId!).subscribe(
      (res: GetSingleProductResponse) => {
        this.product = res;

        // Resimleri sanitize et
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
}
