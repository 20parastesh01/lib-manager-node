import { CreateBookRequest } from "../DTOs/create-book.dto";
import { BookException } from "../exceptions/book.exception";
import { BookRepositoryInterface } from "../persist-layer/book.repository.interface";
import { Book } from "../persist-layer/models/book.model";

export class BookService {
  constructor(private bookRepo: BookRepositoryInterface) {}

  async createBook(data: CreateBookRequest): Promise<Book | BookException> {
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

  async getBooks(): Promise<Book[] | BookException> {
    try {
      const books = await this.bookRepo.getBooks();
      if (!books) return new BookException("books not found", 404);
      return books;
    } catch (e) {
      throw new BookException("failed to get books", 500);
    }
  }
}
