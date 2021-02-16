import { Book } from '@common/book';

export interface GetResponseBook {
  _embedded: {
    books: Book[];
  };
  page: {
    size: number; // # of records in each page
    totalElements: number; // total # of records in db
    totalPages: number; // page total - start from 0th index
    number: number; // current page
  };
}
