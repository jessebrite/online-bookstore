import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private ngbModalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cartDetails();
  }

  public open(name: TemplateRef<string>): void {
    this.ngbModalService.open(name, { size: 'sm' });
  }

  public cartDetails(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.calculateTotalPrice();
    this.returnHome();
  }

  public incrementQuantity(cartItem: CartItem): void {
    cartItem.quantity++;
    this.cartService.calculateTotalPrice();
  }

  public decrementQuantity(cartItem: CartItem): void {
    cartItem.quantity > 1 ? cartItem.quantity-- : this.removeCartItem(cartItem);
    this.cartService.calculateTotalPrice();
    this.returnHome();
  }

  public removeCartItem(cartItem: CartItem): void {
    this.cartService.deleteCartItem(cartItem);
    this.returnHome();
  }

  public clear(): void {
    this.cartItems.splice(0);
    this.cartService.calculateTotalPrice();
    this.router.navigate(['/books']);
  }

  public getItemsInCart(): CartItem[] {
    return this.cartService.getItemsInCart();
  }

  private returnHome(): void {
    if (this.cartItems.length < 1) {
      this.router.navigate(['/']);
    }
  }
}
