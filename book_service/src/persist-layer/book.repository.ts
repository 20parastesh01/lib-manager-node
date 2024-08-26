import { DataSource, Repository } from "typeorm";
import { BookEntity } from "./entities/book.entity";
import { BookException } from "../exceptions/book.exception";
import { Book } from "./models/book.model";
import { CreateBookRequest } from "../DTOs/create-book.dto";

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
}
