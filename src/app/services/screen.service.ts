import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private readonly userUrl = 'http://localhost:8081/api/screen';

  constructor(private http: HttpClient) {
  }

  getAllScreen(): Observable<Screen[]> {
    return this.http.get<Screen[]>(`${this.userUrl}` + "/all");
  }
}
