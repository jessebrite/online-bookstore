import { Component, OnInit } from '@angular/core';

import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(): void {
    // subscribe to totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    // subscribe to totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
