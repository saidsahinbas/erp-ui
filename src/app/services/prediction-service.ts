import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PredictionResponse} from "../models/prediction/prediction-response";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private readonly url = environment.API_URL + '/predict/analyze-and-predict'

  constructor(private httpClient: HttpClient) { }


  getPrediction(body: { productId?: number; supplierId?: number }): Observable<PredictionResponse[]> {
    return this.httpClient.post<PredictionResponse[]>(this.url, body);
  }
}
