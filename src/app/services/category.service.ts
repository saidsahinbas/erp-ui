import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category/category";
import {UpdateCategoryRequestDto} from "../models/category/update-category-request-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categoryUrl = environment.API_URL + '/category';

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all categories
   */
  getAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.categoryUrl}/all`);
  }

  /**
   * Create a new category
   */
  createCategory(categoryName: string): Observable<void> {
    return this.httpClient.post<void>(`${this.categoryUrl}/create`, categoryName);
  }

  /**
   * Update an existing category
   */
  updateCategory(updateCategoryRequestDto: UpdateCategoryRequestDto): Observable<any> {
    return this.httpClient.put(`${this.categoryUrl}/update`, updateCategoryRequestDto);
  }

  /**
   * Delete an existing category by ID
   */
  deleteCategory(categoryId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.categoryUrl}/delete?categoryId=${categoryId}`);
  }


}
