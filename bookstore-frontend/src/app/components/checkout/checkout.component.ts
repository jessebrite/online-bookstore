import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CheckoutService } from '@services/checkout.service';
import { Order } from '@common/order';
// import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  formError = '';
  order: Order = new Order();
  // cartItems: CartItem[] = [];
  cartItems = this.cartService.cartItems;
  orderSent = false;
  submitted = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void { this.returnHome() }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (
      !this.order?.name ||
      !this.order?.city ||
      !this.order?.address ||
      !this.order?.state ||
      !this.order?.zip ||
      !this.order?.country
    ) {
      this.formError = 'Please all fields required';
    } else {
      this.sendOrder();
      this.orderSent = true;
    }
  }

  private sendOrder(): void {
    this.checkoutService.processOrder(this.order).subscribe((data: Order) => {
      this.order = data;
      this.clear();
    });
  }

  public clear(): void {
    this.cartItems.splice(0);
    this.cartService.calculateTotalPrice();
    this.router.navigate(['/books']);
  }

  private returnHome(): void {
    if (this.cartItems.length < 1) {
      this.router.navigate(['/']);
    }
  }
}
