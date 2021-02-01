import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private location: Location) { }

  public getBookInfo() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.bookService.getBookDetails(id)
      .subscribe((data: any) => { this.book = data});
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => { this.getBookInfo(); }
    );
  }

}
