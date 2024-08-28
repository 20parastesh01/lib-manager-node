import { z } from "zod";

export const borrowBookDTO = z.object({
  borrowedBy: z.string(),
  returnDate: z.coerce.date(),
});

export type BorrowBookDTO = z.infer<typeof borrowBookDTO>;
