import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '@common/order';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = `${environment.apiBaseUrl}`;
  order: Order = new Order();

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');

  constructor(private httpClient: HttpClient) {}

  public processOrder(order: Order): Observable<Order> {
    console.log('posted data: ', order);
    return this.httpClient
      .post<Order>(this.url, JSON.stringify(order), {
        headers: this.headers,
      })
      .pipe(
        tap((results: Order) => console.log('results: ', results)),
        catchError(this.processOrder)
      );
  }

  processError(error: any): Observable<any> {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
