import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductCreateRequest} from "../models/product/product-create-request";
import {Observable} from "rxjs";
import {Product} from "../models/product/product";
import {GetAllProductResponse} from "../models/product/get-all-product-response";
import {GetSingleProductResponse} from "../models/product/get-single-product-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productUrl = environment.API_URL + '/product';

  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<GetAllProductResponse[]> {
    return this.httpClient.get<GetAllProductResponse[]>(`${this.productUrl}/all`);
  }
  createProduct(productCreateRequest: ProductCreateRequest) {
    return this.httpClient.post(`${this.productUrl}/create`, productCreateRequest);
  }

  getSinglePrdouct(id: number): Observable<GetSingleProductResponse> {
    return this.httpClient.get<GetSingleProductResponse>(`${this.productUrl}/${id}`);
  }
}
