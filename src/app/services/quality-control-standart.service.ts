import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {QualityControlStandard} from "../models/quality-control-standart/quality-control-standart";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QualityControlStandartService {

  private readonly qualityStandartUrl = environment.API_URL + '/qualitycontrolstandart';

  constructor(private httpClient: HttpClient) { }

  getAllQualityControlStandart(): Observable<QualityControlStandard[]> {
    return this.httpClient.get<QualityControlStandard[]>(`${this.qualityStandartUrl}/all`);
  }
}
