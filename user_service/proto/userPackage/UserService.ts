// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LoginRequest as _userPackage_LoginRequest, LoginRequest__Output as _userPackage_LoginRequest__Output } from '../userPackage/LoginRequest';
import type { LoginResponse as _userPackage_LoginResponse, LoginResponse__Output as _userPackage_LoginResponse__Output } from '../userPackage/LoginResponse';
import type { SignupRequest as _userPackage_SignupRequest, SignupRequest__Output as _userPackage_SignupRequest__Output } from '../userPackage/SignupRequest';
import type { SignupResponse as _userPackage_SignupResponse, SignupResponse__Output as _userPackage_SignupResponse__Output } from '../userPackage/SignupResponse';
import type { ValidateTokenReqeust as _userPackage_ValidateTokenReqeust, ValidateTokenReqeust__Output as _userPackage_ValidateTokenReqeust__Output } from '../userPackage/ValidateTokenReqeust';
import type { ValidateTokenResponse as _userPackage_ValidateTokenResponse, ValidateTokenResponse__Output as _userPackage_ValidateTokenResponse__Output } from '../userPackage/ValidateTokenResponse';

export interface UserServiceClient extends grpc.Client {
  Login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _userPackage_LoginRequest, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _userPackage_LoginRequest, callback: grpc.requestCallback<_userPackage_LoginResponse__Output>): grpc.ClientUnaryCall;
  
  Signup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Signup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Signup(argument: _userPackage_SignupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  Signup(argument: _userPackage_SignupRequest, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  signup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  signup(argument: _userPackage_SignupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  signup(argument: _userPackage_SignupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  signup(argument: _userPackage_SignupRequest, callback: grpc.requestCallback<_userPackage_SignupResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _userPackage_ValidateTokenReqeust, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userPackage_ValidateTokenReqeust, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userPackage_ValidateTokenReqeust, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _userPackage_ValidateTokenReqeust, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userPackage_ValidateTokenReqeust, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userPackage_ValidateTokenReqeust, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userPackage_ValidateTokenReqeust, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _userPackage_ValidateTokenReqeust, callback: grpc.requestCallback<_userPackage_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<_userPackage_LoginRequest__Output, _userPackage_LoginResponse>;
  
  Signup: grpc.handleUnaryCall<_userPackage_SignupRequest__Output, _userPackage_SignupResponse>;
  
  ValidateToken: grpc.handleUnaryCall<_userPackage_ValidateTokenReqeust__Output, _userPackage_ValidateTokenResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  Login: MethodDefinition<_userPackage_LoginRequest, _userPackage_LoginResponse, _userPackage_LoginRequest__Output, _userPackage_LoginResponse__Output>
  Signup: MethodDefinition<_userPackage_SignupRequest, _userPackage_SignupResponse, _userPackage_SignupRequest__Output, _userPackage_SignupResponse__Output>
  ValidateToken: MethodDefinition<_userPackage_ValidateTokenReqeust, _userPackage_ValidateTokenResponse, _userPackage_ValidateTokenReqeust__Output, _userPackage_ValidateTokenResponse__Output>
}
