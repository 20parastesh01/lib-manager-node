import { Email } from "../../types/email";
import { Name } from "../../types/name";
import { Password } from "../../types/password";

export interface User {
  id: string;
  email: Email;
  name: Name;
  password: Password;
}

export type UserWithoutPassword = Omit<User, "password">;

export const toUserWithoutPassword = (user: User): UserWithoutPassword => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
