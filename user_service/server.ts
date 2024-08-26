import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/user";
import { UserServiceHandlers } from "./proto/userPackage/UserService";
import { AppDataSource } from "./src/data-source";
import { SignupRequest__Output } from "./proto/userPackage/SignupRequest";
import { UserRepository } from "./src/persist-layer/user.repository";
import { UserException } from "./src/exceptions/user.exception";
import { signupRequest } from "./src/DTOs/signup.dto";
import { loginRequest } from "./src/DTOs/login.dto";
import { LoginRequest__Output } from "./proto/userPackage/LoginRequest";
import { ValidateTokenReqeust__Output } from "./proto/userPackage/ValidateTokenReqeust";
import { validateTokenRequest } from "./src/DTOs/validate-token.dto";
import { UserService } from "./src/application-layer/user.service";
import { JWTService } from "./src/application-layer/jwt.service";
import { HashService } from "./src/application-layer/hash.service";

const PORT = 50051;
const PROTO_FILE = "./proto/user.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const userPackage = grpcObj.userPackage;

function main() {
  const server = getServer();
  initializeDatabase();

  server.bindAsync(
    `${process.env.GRPC_USER_IP}:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your user server has started on port ${port}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server({
    "grpc.max_receive_message_length": -1,
    "grpc.max_send_message_length": -1,
  });

  const userRepository = new UserRepository(AppDataSource);
  const jwtService = new JWTService();
  const hashSerive = new HashService();
  const userService = new UserService(userRepository, jwtService, hashSerive);

  server.addService(userPackage.UserService.service, {
    Signup: async (call, callback) => {
      const req = call.request as SignupRequest__Output;
      const data = signupRequest.parse(req);
      try {
        const accessTokenOrError = await userService.signup(data);
        if (accessTokenOrError instanceof UserException) {
          callback({
            code: accessTokenOrError.code,
            message: accessTokenOrError.message,
          });
        } else {
          callback(null, { token: accessTokenOrError });
        }
      } catch (e) {
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },

    Login: async (call, callback) => {
      const req = call.request as LoginRequest__Output;
      const data = loginRequest.parse(req);
      try {
        const accessTokenOrError = await userService.login(data);
        if (accessTokenOrError instanceof UserException) {
          callback({
            code: accessTokenOrError.code,
            message: accessTokenOrError.message,
          });
        } else {
          callback(null, { token: accessTokenOrError });
        }
      } catch (e) {
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },
    ValidateToken: async (call, callback) => {
      const req = call.request as ValidateTokenReqeust__Output;
      const data = validateTokenRequest.parse(req);
      try {
        const userIdOrError = await userService.validateToken(data);
        if (userIdOrError instanceof UserException) {
          callback({
            code: userIdOrError.code,
            message: userIdOrError.message,
          });
        } else {
          callback(null, { userId: userIdOrError });
        }
      } catch (e) {
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },
  } as UserServiceHandlers);

  return server;
}

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
}

main();
