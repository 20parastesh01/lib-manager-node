// Original file: proto/book.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateBookRequest as _bookPackage_CreateBookRequest, CreateBookRequest__Output as _bookPackage_CreateBookRequest__Output } from '../bookPackage/CreateBookRequest';
import type { CreateBookResponse as _bookPackage_CreateBookResponse, CreateBookResponse__Output as _bookPackage_CreateBookResponse__Output } from '../bookPackage/CreateBookResponse';

export interface BookServiceClient extends grpc.Client {
  CreateBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _bookPackage_CreateBookRequest, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _bookPackage_CreateBookRequest, callback: grpc.requestCallback<_bookPackage_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateBook: grpc.handleUnaryCall<_bookPackage_CreateBookRequest__Output, _bookPackage_CreateBookResponse>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  CreateBook: MethodDefinition<_bookPackage_CreateBookRequest, _bookPackage_CreateBookResponse, _bookPackage_CreateBookRequest__Output, _bookPackage_CreateBookResponse__Output>
}
