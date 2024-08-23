import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../user_service/proto/user";
import express, { Request, Response } from "express";
import { SignupResponse__Output } from "../user_service/proto/userPackage/SignupResponse";
import { LoginResponse__Output } from "../user_service/proto/userPackage/LoginResponse";

const USER_PORT = 50051;
const USER_PROTO_FILE = "../user_service/proto/user.proto";

const userPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, USER_PROTO_FILE)
);
const grpcObj = grpc.loadPackageDefinition(
  userPackageDef
) as unknown as ProtoGrpcType;
const userClient = new grpcObj.userPackage.UserService(
  `0.0.0.0:${USER_PORT}`,
  grpc.credentials.createInsecure()
);
const app = express();
app.use(express.json());
const port = 3000;

app.post("/signup", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  userClient.Signup(
    { name, email, password },
    (
      err: grpc.ServiceError | null,
      response: SignupResponse__Output | undefined
    ) => {
      if (err) {
        console.error("Error calling gRPC Signup:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (response && response.token) {
        return res.status(200).json({ token: response.token });
      } else {
        return res
          .status(500)
          .json({ message: "No response or token from gRPC service" });
      }
    }
  );
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  userClient.Login(
    { email, password },
    (
      err: grpc.ServiceError | null,
      response: LoginResponse__Output | undefined
    ) => {
      if (err) {
        console.error("Error calling gRPC Login:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (response && response.token) {
        return res.status(200).json({ token: response.token });
      } else {
        return res
          .status(500)
          .json({ message: "No response or token from gRPC service" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`express is listening on port ${port}`);
});
