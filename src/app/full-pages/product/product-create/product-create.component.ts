import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  base64Images: string[] = []; // Görsellerin Base64 formatında saklandığı dizi
  errorMessage: string | null = null; // Hata mesajı

  constructor() { }

  ngOnInit(): void { }

  onFilesSelected(event: any): void {
    const files = event.target.files;

    // Maksimum 2 görsel kontrolü
    if (files.length + this.base64Images.length > 2) {
      this.errorMessage = 'En fazla 2 görsel yükleyebilirsiniz.';
      return;
    }

    this.errorMessage = null;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Görselleri Base64 formatında sakla
        this.base64Images.push(e.target.result);

        // Maksimum 2 görseli kontrol etmek için diziyi kes
        if (this.base64Images.length > 2) {
          this.base64Images = this.base64Images.slice(0, 2);
        }
      };

      reader.readAsDataURL(file); // Resmi Base64 formatına çevir
    }
  }
}
