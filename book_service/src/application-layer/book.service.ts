import { BookException } from "../exceptions/book.exception";
import { BookRepositoryInterface } from "../persist-layer/book.repository.interface";
import { BookDAO } from "./DAOs/book.dao";
import { BookDTO } from "./DTOs/book.dto";

export class BookService {
  constructor(private bookRepo: BookRepositoryInterface) {}

  async createBook(data: BookDTO): Promise<BookDAO | BookException> {
    try {
      const book = this.bookRepo.createBook(data);
      if (book instanceof BookException) return book;
      return book;
    } catch (e) {
      if (e instanceof BookException)
        throw new BookException(e.message, e.code);
    }
    return new BookException("unexpected error", 500);
  }
}
