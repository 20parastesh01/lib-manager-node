import { UserDAO } from "../application-layer/DAOs/user.dao";
import { UserWithPass } from "../application-layer/DAOs/userwithpass.dao";
import { UserDTO } from "../application-layer/DTOs/user.dto";
import { UserException } from "../exceptions/user.exception";
import { Email } from "../types/email";
import { UserRepository } from "./user.repository";

export interface UserRepositoryInterface extends UserRepository {
  createUser(data: UserDTO): Promise<UserDAO | UserException>;
  findByEmail(data: Email): Promise<UserWithPass | UserException>;
}
