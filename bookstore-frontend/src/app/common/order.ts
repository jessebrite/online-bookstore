import { CartItem } from './cart-item';

export class Order {
  public id = 0;
  public firstname = '';
  public lastname = '';
  public email = '';
  public address = '';
  public city = '';
  public state = '';
  public zip = '';
  public country = '';
  public shipped = false;
  carts: CartItem[] = [];

  constructor() {}
}
