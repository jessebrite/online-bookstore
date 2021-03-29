import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { map } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Book } from '@app/common/book';
import { BookService } from '@services/book.service';
import { CartService } from '@services/cart.service';
import { CartItem } from '@common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.bookInfo();
    });
  }

  public bookInfo(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookDetails(id).subscribe((data: Book) => {
      console.log('book: ', data);
      this.book = data;
    }, this.handleError);
  }

  public goBack(): void {
    this.location.back();
  }

  public addToCart(): void {
    const cartItem = new CartItem(this.book);
    this.cartService.addToCart(cartItem);
  }

  private handleError(error: any): any {
    return error(error.message || error);
  }
}
