import { z } from "zod";
import { zodName } from "../../types/name";
import { zodEmail } from "../../types/email";
import { zodInputPassword } from "../../types/inputpassword";

export const signupRequest = z.object({
  name: zodName,
  email: zodEmail,
  password: zodInputPassword,
});

export type SignupRequest = z.infer<typeof signupRequest>;
