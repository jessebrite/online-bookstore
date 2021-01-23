import { Book } from '../common/book';

export interface GetResponseBook {
  _embedded: {
    books: Book[];
  }
}
