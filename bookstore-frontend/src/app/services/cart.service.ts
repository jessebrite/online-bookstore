import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CartItem } from '@common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  public addToCart(theCartItem: CartItem): void {
    let alreadyExistsInCart = false;
    let existingCartItem = new CartItem();

    // find item in cart based on id
    if (this.cartItems?.length > 0) {
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

  public calculateTotalPrice(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
