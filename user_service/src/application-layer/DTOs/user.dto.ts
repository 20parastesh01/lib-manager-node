import { Name } from "../../types/name";
import { Email } from "../../types/email";
import { Password } from "../../types/password";

export interface UserDTO {
  name: Name;
  email: Email;
  password: Password;
}
