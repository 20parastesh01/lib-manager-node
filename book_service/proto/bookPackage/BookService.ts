// Original file: proto/book.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateBookRequest as _bookPackage_CreateBookRequest, CreateBookRequest__Output as _bookPackage_CreateBookRequest__Output } from '../bookPackage/CreateBookRequest';
import type { CreateBookResponse as _bookPackage_CreateBookResponse, CreateBookResponse__Output as _bookPackage_CreateBookResponse__Output } from '../bookPackage/CreateBookResponse';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { GetBookResponse as _bookPackage_GetBookResponse, GetBookResponse__Output as _bookPackage_GetBookResponse__Output } from '../bookPackage/GetBookResponse';
import type { GetBooksResponse as _bookPackage_GetBooksResponse, GetBooksResponse__Output as _bookPackage_GetBooksResponse__Output } from '../bookPackage/GetBooksResponse';

export interface BookServiceClient extends grpc.Client {
  CreateBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  
  GetBook(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  GetBook(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  GetBook(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  GetBook(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  getBook(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  getBook(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  getBook(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  getBook(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bookPackage_GetBookResponse__Output>): grpc.ClientUnaryCall;
  
  GetBooks(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  GetBooks(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  GetBooks(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  GetBooks(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  getBooks(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  getBooks(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  getBooks(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  getBooks(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_bookPackage_GetBooksResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateBook: grpc.handleUnaryCall<_bookPackage_CreateBookRequest__Output, _bookPackage_CreateBookResponse>;
  
  GetBook: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _bookPackage_GetBookResponse>;
  
  GetBooks: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _bookPackage_GetBooksResponse>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  CreateBook: MethodDefinition<_bookPackage_CreateBookRequest, _bookPackage_CreateBookResponse, _bookPackage_CreateBookRequest__Output, _bookPackage_CreateBookResponse__Output>
  GetBook: MethodDefinition<_google_protobuf_Empty, _bookPackage_GetBookResponse, _google_protobuf_Empty__Output, _bookPackage_GetBookResponse__Output>
  GetBooks: MethodDefinition<_google_protobuf_Empty, _bookPackage_GetBooksResponse, _google_protobuf_Empty__Output, _bookPackage_GetBooksResponse__Output>
}
