import { BookCategory } from '../common/book-category';

export interface GetResponseBookCategory {
	_embedded: {
    bookCategory: BookCategory[];
  }
}
