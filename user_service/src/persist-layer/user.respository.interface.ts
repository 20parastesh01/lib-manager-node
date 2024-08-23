import { UserDAO } from "../application-layer/DAOs/user.dao";
import { UserDTO } from "../application-layer/DTOs/user.dto";
import { UserException } from "../exceptions/user.exception";
import { UserRepository } from "./user.repository";

export interface UserRepositoryInterface extends UserRepository {
  createUser(data: UserDTO): Promise<UserDAO | UserException>;
}
