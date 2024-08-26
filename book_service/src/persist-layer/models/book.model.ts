import { BookStatus } from "../../types/book-status";
import { Name } from "../../types/name";

export interface Book {
  id: string;
  name: Name;
  author: Name;
  publisher: Name;
  addedBy: string;
  status: BookStatus;
  description?: string;
}
