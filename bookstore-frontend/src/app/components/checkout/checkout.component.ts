import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CheckoutService } from '@services/checkout.service';
import { Order } from '@common/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order();

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.checkoutService.processOrder.subscribe((data: Order) => {this.order = data});
  }
}
