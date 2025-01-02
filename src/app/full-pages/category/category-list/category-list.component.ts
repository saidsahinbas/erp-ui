import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category/category";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {UpdateCategoryRequestDto} from "../../../models/category/update-category-request-dto";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];

  // Initialize UpdateCategoryRequestDto properly
  updateCategoryRequestDto: UpdateCategoryRequestDto = {
    id: 0,
    categoryName: ''
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Load categories when the component is initialized
  }

  // Fetch all categories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data; // Update categories array
      },
      (error) => {
        console.error('Error loading categories:', error);
        alert('Error loading categories.');
      }
    );
  }

  // Edit category
  editCategory(categoryId: number): void {
    const updatedName = prompt('Enter the new category name:');
    if (updatedName) {
      this.updateCategoryRequestDto.id = categoryId; // Set the category ID
      this.updateCategoryRequestDto.categoryName = updatedName; // Set the new name

      this.categoryService.updateCategory(this.updateCategoryRequestDto).subscribe(
        () => {
          console.log('Category updated successfully');
          this.loadCategories(); // Reload categories after updating
        },
        (error) => {
          console.error('Error updating category:', error);
          alert('Error updating category.');
        }
      );
    }
  }

  // Delete category
  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          console.log('Category deleted successfully');
          this.loadCategories(); // Reload categories after deleting
        },
        (error) => {
          console.error('Error deleting category:', error);
          alert('Error deleting category.');
        }
      );
    }
  }

  // Navigate to category creation page
  navigateToCreateCategory(): void {
    this.router.navigate(['/category/create']); // Navigate to category creation route
  }
}
