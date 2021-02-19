import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '@common/order';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = `${environment.apiBaseUrl}`;
  constructor(private httpClient: HttpClient) {}

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');

  public processOrder(order: Order): Observable<Order> {
    console.log('posted data: ', order);
    return this.httpClient.post<Order>(this.url, order, {
      headers: this.headers
    });
  }
}
