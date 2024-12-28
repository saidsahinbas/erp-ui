import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Supplier} from "../models/supplier/supplier";
import {Role} from "../models/user/role";

@Injectable({
  providedIn: 'root'
})
export class ProductSupplierService {

  private readonly API_URL = environment.API_URL +  '/product/supplier'

  constructor(private httpClient: HttpClient) { }

  /*
  getSuppliersByPoductId(productId: number): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(`${this.API_URL}/product/supplier/product-suppliers/${productId}`, productId);
  }

   */

  getAllRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.API_URL}/all`);
  }
}
