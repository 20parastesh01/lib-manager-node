import { z } from "zod";
import { zodEmail } from "../types/email";
import { zodName } from "../types/name";

export const updateProfileDTO = z.object({
  email: zodEmail.optional(),
  name: zodName.optional(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileDTO>;
