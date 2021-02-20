import { Injectable } from '@angular/core';

@Injectable()
export class Order {
  public id = '';
  public name = '';
  public email = '';
  public address = '';
  public city = '';
  public state = '';
  public zip = '';
  public country = '';
  public shipped = false;
}
