import { z } from "zod";
import { zodName } from "../types/name";
export const createBookRequest = z.object({
  name: zodName,
  author: zodName,
  publisher: zodName,
  addedBy: z.string(),
  description: z.string().optional(),
});

export type CreateBookRequest = z.infer<typeof createBookRequest>;
