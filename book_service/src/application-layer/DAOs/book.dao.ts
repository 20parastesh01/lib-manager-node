import { BookStatus } from "../../types/book-status";
import { Name } from "../../types/name";

export interface BookDAO {
  name: Name;
  author: Name;
  publisher: Name;
  status: BookStatus;
  description?: string;
}
