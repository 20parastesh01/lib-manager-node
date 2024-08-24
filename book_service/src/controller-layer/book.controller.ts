import { BookServiceInterface } from "../application-layer/book.service.interface";
import { BookException } from "../exceptions/book.exception";
import { CreateBookRequest } from "./requests/create-book.request";

export class BookController {
  constructor(private bookService: BookServiceInterface) {}

  async createBook(data: CreateBookRequest) {
    try {
      const dto = {
        name: data.name,
        author: data.author,
        publisher: data.publisher,
        addedBy: data.addedBy,
        description: data.description,
      };
      const book = await this.bookService.createBook(dto);
      if (book instanceof BookException) return book;
      return {
        data: book,
        message: "book created",
        code: 201,
      };
    } catch (e) {
      if (e instanceof BookException)
        throw new BookException(e.message, e.code);
    }
    return new BookException("unexpected error", 500);
  }
}
