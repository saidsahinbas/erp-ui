import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductCreateRequest} from "../models/product/product-create-request";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly userUrl = environment.API_URL + '/product';

  constructor(private httpClient: HttpClient) {
  }

  createProduct(productCreateRequest: ProductCreateRequest) {
    return this.httpClient.post(`${this.userUrl}/create`, productCreateRequest);
  }
}
