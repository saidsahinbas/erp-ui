import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Document} from "../models/document/document";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly API_URL = environment.API_URL + '/document';

  constructor(private httpClient: HttpClient) { }

  getAllDocumentsByProductId(productId: number): Observable<Document[]> {
    return this.httpClient.get<Document[]>(`${this.API_URL}/by-product/${productId}`);
  }
}
