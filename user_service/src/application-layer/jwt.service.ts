import { UserException } from "../exceptions/user.exception";
import { isToken, Token } from "../types/token";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UserWithoutPassword } from "../persist-layer/models/user.model";

const SECRET_KEY = process.env.SECRET_KEY!;

export class JWTService {
  generateToken = async (
    data: UserWithoutPassword
  ): Promise<Token | UserException> => {
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

  verifyJwt = async (
    token: Token
  ): Promise<UserWithoutPassword | UserException> => {
    try {
      const payload = (await jwt.verify(
        token,
        process.env.SECRET_KEY ?? ""
      )) as UserWithoutPassword;
      return payload;
    } catch (e) {
      if (e instanceof TokenExpiredError)
        return new UserException("token expired", 401);
      if (e instanceof JsonWebTokenError)
        return new UserException("unauthorized", 401);
      return new UserException("unexpected error", 500);
    }
  };
}
