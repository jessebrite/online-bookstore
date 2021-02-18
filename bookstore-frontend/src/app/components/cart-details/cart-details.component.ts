import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(
    private cartService: CartService,
    private ngbModalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cartDetails();
  }

  public open(name: TemplateRef<string>): void {
    this.ngbModalService.open(name);
  }

  public cartDetails(): void {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem: CartItem): void {
    cartItem.quantity++;
    this.cartService.calculateTotalPrice();
  }

  decrementQuantity(cartItem: CartItem): void {
    cartItem.quantity > 1 ? cartItem.quantity-- : this.remove(cartItem);
    this.cartService.calculateTotalPrice();
  }

  remove(cartItem: CartItem): void {
    const itemIndex = this.cartItems.findIndex(
      (tempItem) => tempItem.id === cartItem.id
    );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.cartService.calculateTotalPrice();
    }
  }
  public clear(): void {
    this.cartItems.splice(0);
    this.cartService.calculateTotalPrice();
  }
}
