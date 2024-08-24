import { BookStatus } from "../../types/book-status";
import { Name } from "../../types/name";

export interface BookDTO {
  name: Name;
  author: Name;
  publisher: Name;
  addedBy: string;
  description?: string;
}
