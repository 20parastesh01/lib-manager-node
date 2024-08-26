import { UserException } from "../exceptions/user.exception";
import { Hashed } from "../types/hash";
import { isPassword, Password } from "../types/password";
import bcrypt from "bcryptjs";

export class HashService {
  hash = async (input: string): Promise<Password> => {
    const hashed = await bcrypt.hash(input, 8);
    if (isPassword(hashed)) {
      return hashed;
    }
    throw new UserException("could not hash password", 500);
  };

  compareHash = async (plain: string, hashed: Hashed): Promise<boolean> => {
    const isMatch = await bcrypt.compare(plain, hashed);
    return isMatch;
  };
}
