import { BorrowBookDTO } from "../DTOs/borrow-book.dto";
import { BorrowException } from "../exceptions/borrow.exception";
import { BorrowRepository } from "./borrow.repository";
import { BasicBorrow } from "./models/borrow.model";

export interface BorrowRepositoryInterface extends BorrowRepository {
  add(
    data: BorrowBookDTO,
    bookId: string
  ): Promise<BasicBorrow | BorrowException>;
}
