import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  public addToCart(theCartItem: CartItem): void {
    // check whether item already in cart
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem = undefined;

    // find item in cart based on id
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (data) => theCartItem.id === data.id
      )!;
      alreadyExistsInCart = existingCartItem !== undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.calculateTotalPrice();
  }

  private calculateTotalPrice(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }
    console.log(
      `total price: ${totalPriceValue}, total quantity: ${totalQuantityValue}`
    );

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
