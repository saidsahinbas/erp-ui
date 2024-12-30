import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../models/country/country";
import {City} from "../models/city/city";

@Injectable({
  providedIn: 'root'
})
export class CountryCityService {

  private readonly API_URL: string = environment.API_URL + '/country';

  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.API_URL}/all`);
  }

  getCitiesByCountry(id: number): Observable<City[]> {
      return this.httpClient.get<City[]>(`${this.API_URL}/getCity?countryId=${id}`);
  }
}
