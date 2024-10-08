import { CreateUserDTO } from "../DTOs/create-user.dto";
import { UpdateProfileDTO } from "../DTOs/update-profile.dto";
import { UserException } from "../exceptions/user.exception";
import { Email } from "../types/email";
import { User, UserWithoutPassword } from "./models/user.model";
import { UserRepository } from "./user.repository";

export interface UserRepositoryInterface extends UserRepository {
  createUser(data: CreateUserDTO): Promise<UserWithoutPassword | UserException>;
  findByEmail(data: Email): Promise<User | null>;
  update(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<UserWithoutPassword | UserException>;
}
