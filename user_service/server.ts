import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/user";
import { UserServiceHandlers } from "./proto/userPackage/UserService";
import { AppDataSource } from "./src/data-source";
import { SignupRequest__Output } from "./proto/userPackage/SignupRequest";
import { UserRepository } from "./src/persist-layer/user.repository";
import { AuthService } from "./src/application-layer/auth.service";
import { UserController } from "./src/controller/user.controller";
import { UserException } from "./src/exceptions/user.exception";
import { signupRequest } from "./src/controller/requests/signup.request";
import { loginRequest } from "./src/controller/requests/login.request";
import { LoginRequest__Output } from "./proto/userPackage/LoginRequest";
import { ValidateTokenReqeust__Output } from "./proto/userPackage/ValidateTokenReqeust";
import { validateTokenRequest } from "./src/controller/requests/validate-token.request";

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
    `0.0.0.0:${PORT}`,
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
  const server = new grpc.Server();

  const userRepository = new UserRepository(AppDataSource);
  const authService = new AuthService(userRepository);
  const userController = new UserController(authService);

  server.addService(userPackage.UserService.service, {
    Signup: async (call, callback) => {
      const req = call.request as SignupRequest__Output;
      const data = signupRequest.parse(req);
      try {
        const accessTokenOrError = await userController.signup(data);
        if (accessTokenOrError instanceof UserException) {
          callback({
            code: grpc.status.INTERNAL,
            message: accessTokenOrError.message,
          });
        } else {
          callback(null, { token: accessTokenOrError.accessToken });
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
        const accessTokenOrError = await userController.login(data);
        if (accessTokenOrError instanceof UserException) {
          callback({
            code: grpc.status.INTERNAL,
            message: accessTokenOrError.message,
          });
        } else {
          callback(null, { token: accessTokenOrError.accessToken });
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
        const userIdOrError = await userController.validateToken(data);
        if (userIdOrError instanceof UserException) {
          callback({
            code: grpc.status.INTERNAL,
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
