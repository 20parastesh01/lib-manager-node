import { BookDAO } from "../application-layer/DAOs/book.dao";
import { BookDTO } from "../application-layer/DTOs/book.dto";
import { BookException } from "../exceptions/book.exception";
import { BookRepository } from "./book.repository";

export interface BookRepositoryInterface extends BookRepository {
  createBook(data: BookDTO): Promise<BookDAO | BookException>;
}
