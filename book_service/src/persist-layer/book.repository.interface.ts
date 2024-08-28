import { CreateBookRequest } from "../DTOs/create-book.dto";
import { BookException } from "../exceptions/book.exception";
import { BookStatus } from "../types/book-status";
import { BookRepository } from "./book.repository";
import { Book } from "./models/book.model";

export interface BookRepositoryInterface extends BookRepository {
  createBook(data: CreateBookRequest): Promise<Book | BookException>;
  getBooks(): Promise<Book[] | null>;
  findById(id: string): Promise<Book | null>;
  updateStatus(id: string, status: BookStatus): Promise<void | BookException>;
}
