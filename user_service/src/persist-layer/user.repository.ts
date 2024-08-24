import { UserDAO } from "../application-layer/DAOs/user.dao";
import { UserWithPass } from "../application-layer/DAOs/userwithpass.dao";
import { UserDTO } from "../application-layer/DTOs/user.dto";
import { UserException } from "../exceptions/user.exception";
import { Email } from "../types/email";
import { UserEntity } from "./entities/user.entity";
import { DataSource, In, Not, Repository } from "typeorm";

export class UserRepository {
  private userRepo: Repository<UserEntity>;

  constructor(appDataSource: DataSource) {
    this.userRepo = appDataSource.getRepository(UserEntity);
  }

  async createUser(data: UserDTO): Promise<UserDAO | UserException> {
    try {
      const userEntity = await this.userRepo.save({ ...data });
      const userDao = {
        name: userEntity.name,
        email: userEntity.email,
      };
      return userDao;
    } catch (e) {
      throw new UserException("failed to create user", 500);
    }
  }

  async findByEmail(email: Email): Promise<UserWithPass | UserException> {
    const userEntity = await this.userRepo.findOneBy({ email });
    if (!userEntity) throw new UserException("failed to find user", 500);
    const userWithPass = {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    };
    return userWithPass;
  }

  async findIdByEmail(email: Email): Promise<string | UserException> {
    const userEntity = await this.userRepo.findOneBy({ email });
    if (!userEntity) throw new UserException("failed to find user", 500);
    const userId = userEntity.id;
    return userId;
  }
}
