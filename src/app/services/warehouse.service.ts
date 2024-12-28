import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Warehouse} from "../models/warehouse/warehouse";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private readonly warehouseUrl = environment.API_URL + '/warehouse';

  constructor(private httpClient: HttpClient) { }

  getAllWareHouses(): Observable<Warehouse[]> {
    return this.httpClient.get<Warehouse[]>(`${this.warehouseUrl}/all`);
  }
}
