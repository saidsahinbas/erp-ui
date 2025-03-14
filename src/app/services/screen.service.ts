import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private readonly screenUrl = environment.API_URL + '/screen';

  constructor(private http: HttpClient) {
  }

  getAllScreen(): Observable<Screen[]> {
    return this.http.get<Screen[]>(`${this.screenUrl}` + "/all");
  }
}
