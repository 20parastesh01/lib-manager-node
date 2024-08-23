import { UserException } from "../exceptions/user.exception";
import { LoginRequest } from "../controller/requests/login.request";
import { Token } from "../types/token";
import { AuthService } from "./auth.service";
import { UserDTO } from "./DTOs/user.dto";

export interface AuthServiceInterface extends AuthService {
  signup(data: UserDTO): Promise<Token | UserException>;
  login(data: LoginRequest): Promise<Token | UserException>;
}
