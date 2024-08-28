import { DataSource, Repository } from "typeorm";
import { BorrowEntity } from "./entities/borrow.entity";
import { BasicBorrow, toBasicBorrow } from "./models/borrow.model";
import { BorrowBookDTO } from "../DTOs/borrow-book.dto";
import { BorrowException } from "../exceptions/borrow.exception";

export class BorrowRepository {
  private borrowRepo: Repository<BorrowEntity>;

  constructor(appDataSource: DataSource) {
    this.borrowRepo = appDataSource.getRepository(BorrowEntity);
  }

  async add(
    data: BorrowBookDTO,
    bookId: string
  ): Promise<BasicBorrow | BorrowException> {
    try {
      await this.borrowRepo.save({
        bookId: bookId,
        ...data,
      });
      const borrowEntity = await this.borrowRepo.findOneByOrFail({
        bookId: bookId,
      });
      return toBasicBorrow(borrowEntity);
    } catch (e) {
      throw new BorrowException("failed to create new borrow record", 500);
    }
  }
}
