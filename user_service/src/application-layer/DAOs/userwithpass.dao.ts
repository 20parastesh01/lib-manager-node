import { Name } from "../../types/name";
import { Email } from "../../types/email";
import { Password } from "../../types/password";

export interface UserWithPass {
  name: Name;
  email: Email;
  password: Password;
}
