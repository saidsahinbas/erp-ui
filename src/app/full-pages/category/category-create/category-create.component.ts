import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category/category";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categoryName: string = '';

  constructor(private router: Router, private categoryService: CategoryService) {}

  // Kategoriyi kaydet
  saveCategory(): void {
    if (this.categoryName.trim()) {
      this.categoryService.createCategory(this.categoryName).subscribe(() => {
        this.router.navigate(['/category']); // Başarılıysa listeye dön
      });
    } else {
      alert('Kategori adı boş olamaz!');
    }
  }

  // Listeye geri dön
  navigateToCategoryList(): void {
    this.router.navigate(['/category']);
  }
}
