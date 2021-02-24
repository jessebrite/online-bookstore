import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '@common/order';
import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = `${environment.apiBaseUrl}/books`;
  order: Order = new Order();
  // cartItems: CartItem = []

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');
  // .set('Access-Control-Allow-Origin', '*'); // Allow CORS

  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
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
    this.cartService.getItemsInCart().forEach((cartItem: CartItem) => {
      // console.log('cart: ', cartItem);
      this.order.cartItems.push(cartItem);
      console.log('order', order);
    });

    console.log('posted data: ', order);
    return this.httpClient
      .post<Order>(this.url, order, {
        headers: this.headers,
      })
      .pipe(
        tap((results: Order) => console.log('results: ', results)),
        catchError(this.processOrder)
      );
  }

  /**
   * Error handler method that gets called when there's an exception
   *
   * @param error - any type of error
   * @returns - an observable of type error
   */
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
