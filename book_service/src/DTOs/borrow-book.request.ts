import { z } from "zod";
export const borrowBookRequest = z.object({
  borrowedBy: z.string(),
  returnDate: z.string(),
});

export type BorrowBookRequest = z.infer<typeof borrowBookRequest>;
