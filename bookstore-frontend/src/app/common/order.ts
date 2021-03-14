import { CartItem } from './cart-item';
import { User } from './user';

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

  // constructor(public user: User) {}
}
