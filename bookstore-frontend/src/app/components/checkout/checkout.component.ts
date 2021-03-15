import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CheckoutService } from '@services/checkout.service';
import { Order } from '@common/order';
import { User } from '@common/user';
import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  formError = '';
  cartItems = this.cartService.cartItems;
	// user: User 
  order: Order = new Order();
  orderSent = false;
  submitted = false;
  // isEnabled = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.returnHome();
  }

  /**
   * Gets called when user submits the form
   *
   * @param form - ngForm input property
   */
  onSubmit(form: NgForm): void {
    this.submitted = true;
    // If any of the form fields is empty, throw the error msg
    if (
      !this.order?.firstname ||
      !this.order?.lastname ||
      !this.order?.city ||
      !this.order?.email ||
      !this.order?.address ||
      !this.order?.state ||
      !this.order?.zip ||
      !this.order?.country
    ) {
      this.formError = 'Please all fields required';
    } else if (form.valid) {
      // this.isEnabled = true;
      this.sendOrder();
      // Flash the 'thank You' message for two seconds to the user an redirect home
      setTimeout(() => {
        this.clear();
      }, 2000);
      this.orderSent = true;
      this.submitted = false;
    }
  }

  /**
   * Processes the order
   */
  private sendOrder(): void {
    this.cartService.getItemsInCart()?.forEach((cartItem: CartItem) => {
      this.order.cartItem?.push(cartItem);
    });

    this.checkoutService.processOrder(this.order).subscribe((data: Order) => {
      this.order = data;
      this.clear();
    });
  }

  /**
   * Resets cart and redirect user home
   * @remarks should only be called after a successful processing of form
   */
  public clear(): void {
    this.cartItems.splice(0);
    this.cartService.calculateTotalPrice();
    this.router.navigate(['/books']);
  }

  /**
   * Redirects user home if there's no item in the cart
   */
  private returnHome(): void {
    // If there's not item in the cart, send user home
    if (this.cartItems.length < 1) {
      this.router.navigate(['/books']);
    }
  }
}
