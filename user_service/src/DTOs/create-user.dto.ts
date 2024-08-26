import { Email } from "../types/email";
import { Name } from "../types/name";
import { Password } from "../types/password";

export interface CreateUserDTO {
  name: Name;
  email: Email;
  password: Password;
}
