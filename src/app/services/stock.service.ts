import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../models/stock/stock";
import {CreateStockRequest} from "../models/stock/create-stock-request";
import {GetAllStockResponseDto} from "../models/stock/get-all-stock-response-dto";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly API_URL = environment.API_URL + '/stock';

  constructor(private httpClient: HttpClient) { }

  createStock(createStockRequest: CreateStockRequest): Observable<Stock> {
    return this.httpClient.post<Stock>(
      `${this.API_URL}/create`,
      createStockRequest, // JSON olarak gönderilecek veri
      { headers: { 'Content-Type': 'application/json' } } // Content-Type başlığı
    );
  }

  getAllSupplierWithFilter(
    productName: string,
    productCode: string,
    categoryName: string,
    supplierName: string,
    warehouseName: string
  ): Observable<GetAllStockResponseDto[]> {
    const filterPayload = {
      productName: productName || null,
      productCode: productCode || null,
      categoryName: categoryName || null,
      supplierName: supplierName || null,
      warehouseName: warehouseName || null
    };

    return this.httpClient.post<GetAllStockResponseDto[]>(`${this.API_URL}/filter`, filterPayload);
  }
}
