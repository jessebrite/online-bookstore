import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../common/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  listBooks() {
    this.bookService.getBooks().subscribe(data => {
      console.log(data)
      this.books = data
    })
  }

  ngOnInit(): void {
    this.listBooks();
  }

}
