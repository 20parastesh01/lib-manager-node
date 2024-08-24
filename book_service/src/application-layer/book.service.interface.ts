import { BookException } from "../exceptions/book.exception";
import { BookService } from "./book.service";
import { BookDAO } from "./DAOs/book.dao";
import { BookDTO } from "./DTOs/book.dto";

export interface BookServiceInterface extends BookService {
  createBook(data: BookDTO): Promise<BookDAO | BookException>;
}
