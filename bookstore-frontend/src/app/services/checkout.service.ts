import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '@common/order';
import { environment } from '@environments/environment';
import { ProcessErrorService } from '@services/process-error.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = `${environment.apiBaseUrl}/books`;
  order: Order = new Order();
  // order: Order[] = [];

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');
  // .set('Access-Control-Allow-Origin', '*'); // Allow CORS

  constructor(
    private httpClient: HttpClient,
    private processErrorService: ProcessErrorService
  ) {}

  /**
   * Processes the order
   *
   * @remarks
   * This is a service method that should be subscribed to
   *
   * @param order - must be of type Order
   * @returns An observable
   */
  public processOrder(order: Order): Observable<Order> {
    console.log('order: ', order);
    return this.httpClient
      .post<Order>(this.url, order, {
        headers: this.headers,
      })
      .pipe(
        tap((results: Order) => console.log('results: ', results)),
        catchError(this.processErrorService.processError)
      );
  }

  /**
   * Error handler method that gets called when there's an exception
   *
   * @param error - any type of error
   * @returns - an observable of type error
   */
}
