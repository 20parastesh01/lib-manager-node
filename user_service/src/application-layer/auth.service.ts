import { UserException } from "../exceptions/user.exception";
import { UserRepositoryInterface } from "../persist-layer/user.respository.interface";
import { isToken, Token } from "../types/token";
import { UserDAO } from "./DAOs/user.dao";
import jwt from "jsonwebtoken";
import { UserDTO } from "./DTOs/user.dto";
import { Hashed } from "../types/hash";
import bcrypt from "bcryptjs";
import { LoginRequest } from "../controller/requests/login.request";
import { Email } from "../types/email";

const SECRET_KEY = process.env.SECRET_KEY!;

export const generateToken = (data: UserDAO): Token | UserException => {
  try {
    const token = jwt.sign(data, SECRET_KEY, {
      expiresIn: 7200,
    });
    if (isToken(token)) return token as Token;
  } catch (e) {
    throw new UserException("failed to generate token", 500);
  }
  return new UserException("Unexpected error", 500);
};

export const compareHash = async (
  plain: string,
  hashed: Hashed
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plain, hashed);
  return isMatch;
};

export class AuthService {
  constructor(private userRepo: UserRepositoryInterface) {}

  async signup(data: UserDTO): Promise<Token | UserException> {
    try {
      await this.userRepo.createUser(data);
      const userDao = {
        name: data.name,
        email: data.email,
      };
      const accessToken = generateToken(userDao);
      if (accessToken instanceof UserException) return accessToken;
      return accessToken as Token;
    } catch (e) {
      if (e instanceof UserException) {
        throw new UserException(e.message, e.code);
      }
      return new UserException("Unexpected error", 500);
    }
  }

  async login(data: LoginRequest): Promise<Token | UserException> {
    try {
      const user = await this.userRepo.findByEmail(data.email);
      if (user instanceof UserException) {
        return user;
      }
      const isMatchPassword = await compareHash(data.password, user.password);
      if (!isMatchPassword) {
        return new UserException("wrong credentials", 401);
      }
      const basicUser = {
        name: user.name,
        email: user.email,
      };
      const accessToken = generateToken(basicUser);
      if (accessToken instanceof UserException) return accessToken;
      return accessToken as Token;
    } catch (e) {
      if (e instanceof UserException) {
        throw new UserException(e.message, e.code);
      }
      return new UserException("Unexpected error", 500);
    }
  }

  async findUser(email: Email) {
    try {
      return this.userRepo.findIdByEmail(email);
    } catch (e) {
      if (e instanceof UserException)
        throw new UserException(e.message, e.code);
    }
    return new UserException("unexpected error", 500);
  }
}
