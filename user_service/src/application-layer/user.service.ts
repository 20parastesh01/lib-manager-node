import { UserException } from "../exceptions/user.exception";
import { UserRepositoryInterface } from "../persist-layer/user.respository.interface";
import { Token } from "../types/token";
import { LoginRequest } from "../DTOs/login.dto";
import { SignupRequest } from "../DTOs/signup.dto";
import { JWTService } from "./jwt.service";
import { ValidateTokenRequest } from "../DTOs/validate-token.dto";
import { HashService } from "./hash.service";
import {
  toUserWithoutPassword,
  UserWithoutPassword,
} from "../persist-layer/models/user.model";
import { UpdateProfileDTO } from "../DTOs/update-profile.dto";

export class UserService {
  constructor(
    private userRepo: UserRepositoryInterface,
    private jwtService: JWTService,
    private hashService: HashService
  ) {}

  async signup(data: SignupRequest): Promise<Token | UserException> {
    try {
      const userWithEmail = await this.userRepo.findByEmail(data.email);
      if (userWithEmail) return new UserException("email already exists", 400);
      const password = await this.hashService.hash(data.password);
      const dto = {
        name: data.name,
        email: data.email,
        password: password,
      };
      const user = await this.userRepo.createUser(dto);
      if (user instanceof UserException) return user;
      const accessToken = await this.jwtService.generateToken(user);
      if (accessToken instanceof UserException) return accessToken;
      return accessToken as Token;
    } catch (e) {
      if (e instanceof UserException) return e;
    }
    return new UserException("unexpected error", 500);
  }

  async login(data: LoginRequest): Promise<Token | UserException> {
    try {
      const user = await this.userRepo.findByEmail(data.email);
      if (!user) return new UserException("user not found", 404);
      const isMatchPassword = await this.hashService.compareHash(
        data.password,
        user.password
      );
      if (!isMatchPassword) {
        return new UserException("wrong credentials", 401);
      }
      const accessToken = await this.jwtService.generateToken(
        toUserWithoutPassword(user)
      );
      if (accessToken instanceof UserException) return accessToken;
      return accessToken as Token;
    } catch (e) {
      if (e instanceof UserException) {
        return e;
      }
      return new UserException("Unexpected error", 500);
    }
  }

  async getProfile(
    userId: string
  ): Promise<UserWithoutPassword | UserException> {
    try {
      const user = await this.userRepo.findById(userId);
      if (!user) return new UserException("user not found", 404);
      return user;
    } catch (e) {
      if (e instanceof UserException) {
        return e;
      }
      return new UserException("Unexpected error", 500);
    }
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileDTO
  ): Promise<UserWithoutPassword | UserException> {
    try {
      let filteredData: Partial<UpdateProfileDTO> = {};
      if (data.email !== undefined) {
        filteredData.email = data.email;
      }
      if (data.name !== undefined) {
        filteredData.name = data.name;
      }

      const user = await this.userRepo.update(userId, filteredData);
      if (user instanceof UserException) return user;
      return user;
    } catch (e) {
      if (e instanceof UserException) {
        return e;
      }
      throw new UserException("failed to update", 500);
    }
  }

  async validateToken(
    data: ValidateTokenRequest
  ): Promise<string | UserException> {
    try {
      const payload = (await this.jwtService.verifyJwt(
        data.token
      )) as UserWithoutPassword;
      if (payload instanceof UserException) return payload;
      const user = await this.userRepo.findByEmail(payload.email);
      if (!user) return new UserException("user not found", 404);
      return user.id;
    } catch (e) {
      if (e instanceof UserException) return e;
    }
    return new UserException("unexpected error", 500);
  }
}
