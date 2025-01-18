import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetAllStockResponseDto} from "../models/stock/get-all-stock-response-dto";
import {SupplierOrder} from "../models/supplier-order/supplier-order";
import {SupplierOrderFilteredResponseDto} from "../models/supplier-order/supplier-order-filtered-response-dto";

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderService {

  private readonly supplierOrderUrl = environment.API_URL + '/supplier-order';

  constructor(private httpClient: HttpClient) { }

  getAllSupplierOrderWithFilter(
    productId: string,
    supplierId: string,
  ): Observable<SupplierOrderFilteredResponseDto[]> {
    const filterPayload = {
      productId: productId || null,
      supplierId: supplierId || null,
    };

    return this.httpClient.post<SupplierOrderFilteredResponseDto[]>(`${this.supplierOrderUrl}/filter`, filterPayload);
  }

  getAllSupplierOrder(): Observable<SupplierOrderFilteredResponseDto[]> {
    return this.httpClient.get<SupplierOrderFilteredResponseDto[]>(`${this.supplierOrderUrl}/all`);
  }
}
