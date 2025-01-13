import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QualityControlResultList} from "../models/quality-control/result/quality-control-result-list";
import {
  QualityTestResultInfoFromFrontendDto
} from "../models/quality-control/quality-test-result-info-from-frontend-dto";

@Injectable({
  providedIn: 'root'
})
export class QualityControlResultService {

  private readonly url = environment.API_URL + '/quality-control/result'

  constructor(private httpClient: HttpClient) { }

  getAllResults(): Observable<QualityControlResultList[]> {
    return this.httpClient.get<QualityControlResultList[]>(this.url + '/all');
  }

  saveResult(result: QualityTestResultInfoFromFrontendDto) {
    return this.httpClient.post<QualityTestResultInfoFromFrontendDto>(`${this.url + '/save-result'}`, result)
  }
}
