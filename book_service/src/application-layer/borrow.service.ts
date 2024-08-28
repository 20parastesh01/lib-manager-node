import { borrowBookDTO, BorrowBookDTO } from "../DTOs/borrow-book.dto";
import { BorrowBookRequest } from "../DTOs/borrow-book.request";
import { BorrowBookResponse } from "../DTOs/borrow-book.response";
import { BorrowException } from "../exceptions/borrow.exception";
import { BookRepositoryInterface } from "../persist-layer/book.repository.interface";
import { BorrowRepositoryInterface } from "../persist-layer/borrow.repository.interface";
import { BookStatus } from "../types/book-status";

export class BorrowService {
  constructor(
    private borrowRepo: BorrowRepositoryInterface,
    private bookRepo: BookRepositoryInterface
  ) {}

  async borrow(
    data: BorrowBookRequest,
    bookId: string
  ): Promise<BorrowBookResponse | BorrowException> {
    const book = await this.bookRepo.findById(bookId);
    if (!book) return new BorrowException("book not found", 404);
    try {
      const addBorrow = await this.borrowRepo.add(
        borrowBookDTO.parse(data),
        bookId
      );
      if (addBorrow instanceof BorrowException) return addBorrow;
      this.bookRepo.updateStatus(bookId, BookStatus.BORROWED);
      const borrow = {
        id: addBorrow.id,
        bookName: book.name,
        returnDate: addBorrow.returnDate.toLocaleDateString(),
        createdAt: addBorrow.createdAt.toLocaleDateString(),
      };
      return borrow;
    } catch (e) {
      if (e instanceof BorrowException)
        throw new BorrowException(e.message, e.code);
    }
    return new BorrowException("failed to borrow", 500);
  }
}
