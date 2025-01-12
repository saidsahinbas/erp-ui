import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {QualityControlLevel} from "../models/quality-control/level/quality-control-level";
import {
  SampleApproveAndRejectSizeByProductDto
} from "../models/quality-control/sample-approve-and-reject-size-by-product-dto";

@Injectable({
  providedIn: 'root'
})
export class QualityControlLevelService {

  private readonly url = environment.API_URL + '/quality-control/level'

  constructor(private httpClient: HttpClient) { }

  getTable(): Observable<QualityControlLevel[]> {
    return this.httpClient.get<QualityControlLevel[]>(`${this.url}/table`);
  }

  defineOrderQualityTest(orderId: number): Observable<SampleApproveAndRejectSizeByProductDto[]> {
    return this.httpClient.get<SampleApproveAndRejectSizeByProductDto[]>(`${this.url}/define/`+ orderId);
  }
}
