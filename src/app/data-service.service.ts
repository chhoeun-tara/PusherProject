import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  url = 'http://localhost:3000/order';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  confirmOrder(data): Observable<any> {
    return this.http.post(this.url, JSON.stringify(data), {
      headers: this.headers
    });
  }
}
