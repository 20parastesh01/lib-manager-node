import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/book";
import { AppDataSource } from "./src/data-source";
import { BookServiceHandlers } from "./proto/bookPackage/BookService";
import { BookRepository } from "./src/persist-layer/book.repository";
import { BookService } from "./src/application-layer/book.service";
import { CreateBookRequest__Output } from "./proto/bookPackage/CreateBookRequest";
import { BookException } from "./src/exceptions/book.exception";
import { createBookRequest } from "./src/DTOs/create-book.dto";
import { BorrowRepository } from "./src/persist-layer/borrow.repository";
import { BorrowService } from "./src/application-layer/borrow.service";
import { BorrowBookRequest__Output } from "./proto/bookPackage/BorrowBookRequest";
import { borrowBookDTO } from "./src/DTOs/borrow-book.dto";
import { BorrowException } from "./src/exceptions/borrow.exception";
import { borrowBookRequest } from "./src/DTOs/borrow-book.request";

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

  const borrowRepository = new BorrowRepository(AppDataSource);
  const borrowService = new BorrowService(borrowRepository, bookRepository);

  server.addService(bookPackage.BookService.service, {
    CreateBook: async (call, callback) => {
      const req = call.request as CreateBookRequest__Output;
      const data = createBookRequest.parse(req);
      try {
        const borrowOrError = await bookService.createBook(data);
        if (borrowOrError instanceof BookException) {
          callback({
            code: borrowOrError.code,
            message: borrowOrError.message,
          });
        } else {
          const book = borrowOrError;
          callback(null, {
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            status: book.status,
            description: book.description,
            id: book.id,
          });
        }
      } catch (e) {
        if (e instanceof BookException) {
          callback({
            code: e.code,
            message: e.message,
          });
        }
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },

    GetBooks: async (call, callback) => {
      try {
        const booksOrError = await bookService.getBooks();
        if (booksOrError instanceof BookException) {
          callback({
            code: booksOrError.code,
            message: booksOrError.message,
          });
        } else {
          const books = booksOrError.map((book) => ({
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            status: book.status,
            addedBy: book.addedBy,
            description: book.description,
            id: book.id,
          }));

          callback(null, { books });
        }
      } catch (e) {
        if (e instanceof BookException) {
          callback({
            code: e.code,
            message: e.message,
          });
        }
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },

    BorrowBook: async (call, callback) => {
      const req = call.request as BorrowBookRequest__Output;
      const data = borrowBookRequest.parse(req);
      try {
        const borrowOrError = await borrowService.borrow(
          data,
          req.bookId as string
        );
        if (borrowOrError instanceof BorrowException) {
          callback({
            code: borrowOrError.code,
            message: borrowOrError.message,
          });
        } else {
          const borrow = borrowOrError;
          callback(null, {
            bookName: borrow.bookName,
            returnDate: borrow.returnDate,
            createdAt: borrow.createdAt,
            id: borrow.id,
          });
        }
      } catch (e) {
        if (e instanceof BorrowException) {
          callback({
            code: e.code,
            message: e.message,
          });
        }
        callback({
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        });
      }
    },

    GetBook: (call, callback) => {},
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
