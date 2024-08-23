// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SignupRequest as _userPackage_SignupRequest, SignupRequest__Output as _userPackage_SignupRequest__Output } from '../userPackage/SignupRequest';
import type { SignupResponse as _userPackage_SignupResponse, SignupResponse__Output as _userPackage_SignupResponse__Output } from '../userPackage/SignupResponse';

export interface UserServiceClient extends grpc.Client {
  Singup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Singup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Singup(argument: _userPackage_SignupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Singup(argument: _userPackage_SignupRequest, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  singup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  singup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  singup(argument: _userPackage_SignupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  singup(argument: _userPackage_SignupRequest, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  Singup: grpc.handleUnaryCall<_userPackage_SignupRequest__Output, _userPackage_SignupResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  Singup: MethodDefinition<_userPackage_SignupRequest, _userPackage_SignupResponse, _userPackage_SignupRequest__Output, _userPackage_SignupResponse__Output>
}
