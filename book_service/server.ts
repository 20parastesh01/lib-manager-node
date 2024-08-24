import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/book";
import { AppDataSource } from "./src/data-source";
import { BookServiceHandlers } from "./proto/bookPackage/BookService";
import { BookRepository } from "./src/persist-layer/book.repository";
import { BookService } from "./src/application-layer/book.service";
import { BookController } from "./src/controller-layer/book.controller";
import { CreateBookRequest__Output } from "./proto/bookPackage/CreateBookRequest";
import { createBookRequest } from "./src/controller-layer/requests/create-book.request";
import { BookException } from "./src/exceptions/book.exception";

const PORT = 50052;
const PROTO_FILE = "./proto/book.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const bookPackage = grpcObj.bookPackage;

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

  const bookRepository = new BookRepository(AppDataSource);
  const bookService = new BookService(bookRepository);
  const bookController = new BookController(bookService);

  server.addService(bookPackage.BookService.service, {
    // Signup: async (call, callback) => {
    //   const req = call.request as SignupRequest__Output;
    //   const data = signupRequest.parse(req);
    //   const fn: (input: typeof data) => CustomError | {} =
    //     userController.signup;
    //   handleRequest(call, callback)(data, fn);
    // },

    CreateBook: async (call, callback) => {
      console.log("test");
      const req = call.request as CreateBookRequest__Output;
      const data = createBookRequest.parse(req);
      try {
        const bookOrError = await bookController.createBook(data);
        if (bookOrError instanceof BookException) {
          callback({
            code: grpc.status.INTERNAL,
            message: bookOrError.message,
          });
        } else {
          const book = bookOrError.data;
          callback(null, {
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            status: book.status,
            description: book.description,
          });
        }
      } catch (e) {
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },
  } as BookServiceHandlers);

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
