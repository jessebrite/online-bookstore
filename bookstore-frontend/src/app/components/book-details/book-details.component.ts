import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.bookInfo();
    });
  }

  public bookInfo(): void {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.bookService.getBookDetails(id).subscribe((data: Book) => {
      this.book = data;
    }, this.handleError);
  }

  public goBack(): void {
    this.location.back();
  }

  public addToCart(): void {
    console.log(
      `book name: ${this.book.name}, and price: ${this.book.unitPrice}`
    );
    const cartItem = new CartItem(this.book);
    this.cartService.addToCart(cartItem);
  }

  private handleError(error: any): any {
    //console.error('Something has gone wrong', error);
    return error(error.message || error);
  }
}
