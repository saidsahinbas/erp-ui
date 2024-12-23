import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplier} from "../models/supplier/supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly supplierUrl = environment.API_URL + '/supplier';

  constructor(private httpClient: HttpClient) { }

  getAllSupplier(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(`${this.supplierUrl}/all`);
  }

}
