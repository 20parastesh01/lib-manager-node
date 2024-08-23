import { z } from "zod";
import { zodEmail } from "../../types/email";
import { zodInputPassword } from "../../types/inputpassword";

export const loginRequest = z.object({
  email: zodEmail,
  password: zodInputPassword,
});

export type LoginRequest = z.infer<typeof loginRequest>;
