import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  url = 'http://localhost:3000';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  order(data): Observable<any> {
    return this.http.post(this.url + '/order', JSON.stringify(data), {
      headers: this.headers
    });
  }
  report(data): Observable<any> {
    return this.http.post(this.url + '/report', JSON.stringify(data), {
      headers: this.headers
    });
  }
}
