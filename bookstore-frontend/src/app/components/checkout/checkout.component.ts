import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CheckoutService } from '@services/checkout.service';
import { Order } from '@common/order';
import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order();
  cartItem: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.checkoutService.processOrder(this.order).subscribe((data: Order) => {
      this.order = data;
      this.clear();
    });
  }

  public clear(): void {
    this.cartItem.splice(0);
    this.cartService.calculateTotalPrice();
    this.router.navigate(['/books']);
  }
}
