// Original file: proto/book.proto


export interface BorrowBookRequest {
  'borrowedBy'?: (string);
  'bookId'?: (string);
  'returnDate'?: (string);
}

export interface BorrowBookRequest__Output {
  'borrowedBy'?: (string);
  'bookId'?: (string);
  'returnDate'?: (string);
}
