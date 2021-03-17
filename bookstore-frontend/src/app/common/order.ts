import { CartItem } from './cart-item';
import { User } from './user';
import { TokenStorageService } from '@services/token-storage.service';

export class Order {
  public firstname = '';
  public lastname = '';
  public email = '';
  public address = '';
  public city = '';
  public state = '';
  public zip = '';
  public country = '';
  public shipped = false;
  cartItem: CartItem[] = [];

  constructor() {
    // this.firstname = user?.firstname || '';
    // this.lastname = 'golden';
    // this.email = user?.email || '';
  }
}
