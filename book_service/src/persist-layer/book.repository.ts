import { DataSource, Repository } from "typeorm";
import { BookEntity } from "./entities/book.entity";
import { BookDAO } from "../application-layer/DAOs/book.dao";
import { BookException } from "../exceptions/book.exception";
import { BookDTO } from "../application-layer/DTOs/book.dto";

export class BookRepository {
  private bookRepo: Repository<BookEntity>;

  constructor(appDataSource: DataSource) {
    this.bookRepo = appDataSource.getRepository(BookEntity);
  }

  async createBook(data: BookDTO): Promise<BookDAO | BookException> {
    try {
      const bookEntity = await this.bookRepo.save({ ...data });
      const bookDao = {
        name: bookEntity.name,
        author: bookEntity.author,
        publisher: bookEntity.publisher,
        status: bookEntity.status,
        description: bookEntity.description,
      };
      return bookDao;
    } catch (e) {
      throw new BookException("failed to create book", 500);
    }
  }
}
