import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../common/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  public listBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data),
      this.handleError;
  }

  ngOnInit(): void {
    this.listBooks();
  }

  private handleError(error: any): Observable<any> {
    console.error('Something has gone wrong', error);
    return error(error.message || error);
  }


}
