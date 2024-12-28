import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from "../models/stock/stock";
import {CreateStockRequest} from "../models/stock/create-stock-request";

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

  getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${this.API_URL}/all`);
  }
}
