import { UserException } from "../exceptions/user.exception";
import { Email } from "../types/email";
import { UserEntity } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import {
  toUserWithoutPassword,
  User,
  UserWithoutPassword,
} from "./models/user.model";
import { CreateUserDTO } from "../DTOs/create-user.dto";
import { UpdateProfileDTO } from "../DTOs/update-profile.dto";

export class UserRepository {
  private userRepo: Repository<UserEntity>;

  constructor(appDataSource: DataSource) {
    this.userRepo = appDataSource.getRepository(UserEntity);
  }

  async createUser(
    data: CreateUserDTO
  ): Promise<UserWithoutPassword | UserException> {
    try {
      const userEntity = await this.userRepo.save({ ...data });
      const userDao = toUserWithoutPassword(userEntity);
      return userDao;
    } catch (e) {
      return new UserException("failed to create user", 500);
    }
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userEntity = await this.userRepo.findOneBy({ email });
    return userEntity ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userRepo.findOneBy({ id });
    return userEntity ?? null;
  }

  async update(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<UserWithoutPassword | UserException> {
    try {
      await this.userRepo.save({ id: userId, ...data });
      const user = await this.userRepo.findOneByOrFail({ id: userId });
      return toUserWithoutPassword(user);
    } catch (e) {
      throw new UserException("failed to update user profile", 500);
    }
  }
}
