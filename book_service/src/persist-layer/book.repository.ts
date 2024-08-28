import { DataSource, Repository } from "typeorm";
import { BookEntity } from "./entities/book.entity";
import { BookException } from "../exceptions/book.exception";
import { Book } from "./models/book.model";
import { CreateBookRequest } from "../DTOs/create-book.dto";
import { BookStatus } from "../types/book-status";

export class BookRepository {
  private bookRepo: Repository<BookEntity>;

  constructor(appDataSource: DataSource) {
    this.bookRepo = appDataSource.getRepository(BookEntity);
  }

  async createBook(data: CreateBookRequest): Promise<Book | BookException> {
    try {
      const bookEntity = await this.bookRepo.save({ ...data });
      return bookEntity;
    } catch (e) {
      throw new BookException("failed to create book", 500);
    }
  }

  async getBooks(): Promise<Book[] | null> {
    const books = await this.bookRepo.find();
    return books;
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.bookRepo.findOneBy({ id });
    return book;
  }

  async updateStatus(
    id: string,
    status: BookStatus
  ): Promise<void | BookException> {
    try {
      await this.bookRepo.save({ id: id, status: status });
    } catch (e) {
      throw new BookException("failed to update book status", 500);
    }
  }
}
