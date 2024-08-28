export interface Borrow {
  id: string;
  borrowedBy: string;
  bookId: string;
  returnDate: Date;
  createdAt: Date;
  returnedAt?: Date;
}

export type BasicBorrow = Omit<Borrow, "borrowedBy" | "returnedAt">;

export const toBasicBorrow = (borrow: Borrow): BasicBorrow => {
  const { borrowedBy, returnedAt, ...basicBorrow } = borrow;
  return basicBorrow;
};
