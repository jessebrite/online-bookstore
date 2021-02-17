import { Book } from './book';

export class CartItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  unitPrice: number;
  quantity: number;

  constructor(book?: Book) {
    this.id = book?.id || '';
    this.name = book?.name || '';
    this.description = book?.description || '';
    this.imageUrl = book?.imageUrl || '';
    this.unitPrice = book?.unitPrice || 0;
    this.quantity = 1;
  }
}
