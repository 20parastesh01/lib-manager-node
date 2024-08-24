import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType as UserProtoGrpcType } from "../user_service/proto/user";
import { ProtoGrpcType as BookProtoGrpcType } from "../book_service/proto/book";
import express, { Request, Response } from "express";
import { SignupResponse__Output } from "../user_service/proto/userPackage/SignupResponse";
import { LoginResponse__Output } from "../user_service/proto/userPackage/LoginResponse";
import { CreateBookResponse__Output } from "../book_service/proto/bookPackage/CreateBookResponse";
import { ValidationException } from "./exceptions/ValidationException";
import { ValidateTokenResponse__Output } from "../user_service/proto/userPackage/ValidateTokenResponse";

const USER_PORT = 50051;
const USER_PROTO_FILE = "../user_service/proto/user.proto";

const BOOK_PORT = 50052;
const BOOK_PROTO_FILE = "../book_service/proto/book.proto";

const userPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, USER_PROTO_FILE)
);

const bookPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, BOOK_PROTO_FILE)
);

const userGrpcObj = grpc.loadPackageDefinition(
  userPackageDef
) as unknown as UserProtoGrpcType;

const bookGrpcObj = grpc.loadPackageDefinition(
  bookPackageDef
) as unknown as BookProtoGrpcType;

const userClient = new userGrpcObj.userPackage.UserService(
  `0.0.0.0:${USER_PORT}`,
  grpc.credentials.createInsecure()
);

const bookClient = new bookGrpcObj.bookPackage.BookService(
  `0.0.0.0:${BOOK_PORT}`,
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

app.post("/login", async (req: Request, res: Response) => {
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

  // const func = (email: string, password: string) => {
  //   const func2 = <T, U>(
  //     fn: (arg: T, callback: grpc.requestCallback<U>) => grpc.ClientUnaryCall
  //   ) => {
  //     console.log();

  //     (val: T) => {
  //       return new Promise((resolve, reject) => {
  //         let result: U | undefined = undefined;
  //         const a = fn(
  //           val,
  //           (err: grpc.ServiceError | null, response: U | undefined) => {
  //             result = response;
  //           }
  //         );
  //         a.on("status", () => resolve(result));
  //       });
  //     };
  //   };
  //   const b = func2(userClient.Login)({ email, password });
  //   return b;
  // };

  // const a = await func(email, password);
  // console.log("res: ", a);
});

app.post("/createBook", (req: Request, res: Response) => {
  const { name, author, publisher, description } = req.body;
  const token = req.header("Authorization");
  if (!token) return new ValidationException("Unauthorized", 401);

  userClient.ValidateToken(
    { token },
    (
      err: grpc.ServiceError | null,
      response: ValidateTokenResponse__Output | undefined
    ) => {
      console.log(response);
      if (err) {
        console.error("Error calling gRPC create book:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (response && response.userId) {
        addBook(name, author, publisher, description, response.userId);
      } else {
        return res
          .status(500)
          .json({ message: "No response from gRPC service" });
      }
    }
  );

  const addBook = (
    name: string,
    author: string,
    publisher: string,
    description: string,
    userId: string
  ) => {
    bookClient.CreateBook(
      { name, author, publisher, addedBy: userId, description },
      (
        err: grpc.ServiceError | null,
        response: CreateBookResponse__Output | undefined
      ) => {
        if (err) {
          console.error("Error calling gRPC Login:", err.message);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (response) {
          return res.status(200).json(response);
        } else {
          return res
            .status(500)
            .json({ message: "No response or token from gRPC service" });
        }
      }
    );
  };
});

app.listen(port, () => {
  console.log(`express is listening on port ${port}`);
});
