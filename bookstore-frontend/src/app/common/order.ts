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

  constructor(private tokenService?: TokenStorageService) {
    const user = tokenService?.getCurrentUser();
    console.log('user: ', user);
    this.firstname = user?.firstname || '';
    this.lastname = 'golden';
    // this.lastname = user?.username || '';
    this.email = user?.email || '';
  }
}
