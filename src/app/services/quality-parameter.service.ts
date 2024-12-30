import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QualityParameter} from "../models/quality-parameter/quality-parameter";

@Injectable({
  providedIn: 'root'
})
export class QualityParameterService {

  private readonly API_URL = environment.API_URL + '/qualityparameter'

  constructor(private httpClient: HttpClient) { }

  getAllQualityParameters(): Observable<QualityParameter[]> {
    return this.httpClient.get<QualityParameter[]>(`${this.API_URL}/all`);
  }

  createQualityParameter(qualityParameter: QualityParameter): Observable<QualityParameter> {
    return this.httpClient.post<QualityParameter>(`${this.API_URL}/create`, qualityParameter);
  }
}
