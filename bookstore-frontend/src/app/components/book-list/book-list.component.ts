import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor() { }

  books: Book[] = [
    {
      sku: 'kd-214',
      name: 'Javascript for noobs',
      description: 'Title pretty much explains it',
      unitPrice: 75,
      imageUrl: '...',
      active: false,
      unitsInStock: 79,
      createdOn: new Date(),
      updatedOn: null
    },
    {
      sku: 'sdf-501',
      name: 'Basic SQL',
      description: 'SQL for dummies',
      unitPrice: 42,
      imageUrl: '...',
      active: false,
      unitsInStock: 79,
      createdOn: new Date(),
      updatedOn: null
    },
    {
      sku: 'mt-212',
      name: 'Java How To Programme',
      description: 'An in-depth book on Java',
      unitPrice: 30,
      imageUrl: 'assets/images/books/..',
      active: false,
      unitsInStock: 79,
      createdOn: new Date(),
      updatedOn: null
    }]

  ngOnInit(): void {
  }

}
