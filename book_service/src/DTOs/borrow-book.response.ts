import { Name } from "../types/name";

export interface BorrowBookResponse {
  id: string;
  bookName: Name;
  returnDate: string;
  createdAt: string;
}
