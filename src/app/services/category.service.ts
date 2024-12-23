import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly categoryUrl = environment.API_URL + '/category';

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.categoryUrl}/all`);
  }
}
