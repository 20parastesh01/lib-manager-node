import { isPassword, Password } from "../types/password";
import { UserException } from "../exceptions/user.exception";
import { SignupRequest } from "./requests/signup.request";
import bcrypt from "bcryptjs";
import { AccessToken } from "./responses/accestoken.response";
import { AuthServiceInterface } from "../application-layer/auth.service.interface";
import { LoginRequest } from "./requests/login.request";
import { ValidateTokenRequest } from "./requests/validate-token.request";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UserDAO } from "../application-layer/DAOs/user.dao";

export const hash = async (input: string): Promise<Password> => {
  const hashed = await bcrypt.hash(input, 8);
  if (isPassword(hashed)) {
    return hashed;
  }
  throw new UserException("could not hash", 500);
};

export class UserController {
  constructor(private authService: AuthServiceInterface) {}

  async signup(data: SignupRequest): Promise<AccessToken | UserException> {
    try {
      const password = await hash(data.password);
      const dto = {
        name: data.name,
        email: data.email,
        password: password,
      };
      const accessToken = await this.authService.signup(dto);
      const result = { accessToken: accessToken };
      if (result instanceof UserException) return result;
      return result as AccessToken;
    } catch (e) {
      if (e instanceof UserException)
        throw new UserException(e.message, e.code);
    }
    return new UserException("unexpected error", 500);
  }

  async login(data: LoginRequest): Promise<AccessToken | UserException> {
    try {
      const accessToken = await this.authService.login(data);
      const result = { accessToken: accessToken };
      if (result instanceof UserException) return result;
      return result as AccessToken;
    } catch (e) {
      if (e instanceof UserException)
        throw new UserException(e.message, e.code);
    }
    return new UserException("unexpected error", 500);
  }

  async validateToken(
    data: ValidateTokenRequest
  ): Promise<string | UserException> {
    try {
      const payload = jwt.verify(
        data.token,
        process.env.SECRET_KEY ?? ""
      ) as UserDAO;
      const userId = await this.authService.findUser(payload.email);
      if (!userId) return new UserException("user not found", 404);
      return userId;
    } catch (e) {
      if (e instanceof TokenExpiredError)
        return new UserException("token expired", 401);
      if (e instanceof JsonWebTokenError)
        return new UserException("unauthorized", 401);
      return new UserException("unexpected error", 500);
    }
  }
}
