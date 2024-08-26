// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProfileRequest as _userPackage_GetProfileRequest, GetProfileRequest__Output as _userPackage_GetProfileRequest__Output } from '../userPackage/GetProfileRequest';
import type { GetProfileResponse as _userPackage_GetProfileResponse, GetProfileResponse__Output as _userPackage_GetProfileResponse__Output } from '../userPackage/GetProfileResponse';
import type { LoginRequest as _userPackage_LoginRequest, LoginRequest__Output as _userPackage_LoginRequest__Output } from '../userPackage/LoginRequest';
import type { LoginResponse as _userPackage_LoginResponse, LoginResponse__Output as _userPackage_LoginResponse__Output } from '../userPackage/LoginResponse';
import type { SignupRequest as _userPackage_SignupRequest, SignupRequest__Output as _userPackage_SignupRequest__Output } from '../userPackage/SignupRequest';
import type { SignupResponse as _userPackage_SignupResponse, SignupResponse__Output as _userPackage_SignupResponse__Output } from '../userPackage/SignupResponse';
import type { UpdateProfileRequest as _userPackage_UpdateProfileRequest, UpdateProfileRequest__Output as _userPackage_UpdateProfileRequest__Output } from '../userPackage/UpdateProfileRequest';
import type { UpdateProfileResponse as _userPackage_UpdateProfileResponse, UpdateProfileResponse__Output as _userPackage_UpdateProfileResponse__Output } from '../userPackage/UpdateProfileResponse';
import type { ValidateTokenReqeust as _userPackage_ValidateTokenReqeust, ValidateTokenReqeust__Output as _userPackage_ValidateTokenReqeust__Output } from '../userPackage/ValidateTokenReqeust';
import type { ValidateTokenResponse as _userPackage_ValidateTokenResponse, ValidateTokenResponse__Output as _userPackage_ValidateTokenResponse__Output } from '../userPackage/ValidateTokenResponse';

export interface UserServiceClient extends grpc.Client {
  GetProfile(argument: _userPackage_GetProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  GetProfile(argument: _userPackage_GetProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  GetProfile(argument: _userPackage_GetProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  GetProfile(argument: _userPackage_GetProfileRequest, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  getProfile(argument: _userPackage_GetProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  getProfile(argument: _userPackage_GetProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  getProfile(argument: _userPackage_GetProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  getProfile(argument: _userPackage_GetProfileRequest, callback: grpc.requestCallback<_userPackage_GetProfileResponse__Output>): grpc.ClientUnaryCall;
  
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
  
  UpdateProfile(argument: _userPackage_UpdateProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _userPackage_UpdateProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _userPackage_UpdateProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _userPackage_UpdateProfileRequest, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _userPackage_UpdateProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _userPackage_UpdateProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _userPackage_UpdateProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _userPackage_UpdateProfileRequest, callback: grpc.requestCallback<_userPackage_UpdateProfileResponse__Output>): grpc.ClientUnaryCall;
  
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
  GetProfile: grpc.handleUnaryCall<_userPackage_GetProfileRequest__Output, _userPackage_GetProfileResponse>;
  
  Login: grpc.handleUnaryCall<_userPackage_LoginRequest__Output, _userPackage_LoginResponse>;
  
  Signup: grpc.handleUnaryCall<_userPackage_SignupRequest__Output, _userPackage_SignupResponse>;
  
  UpdateProfile: grpc.handleUnaryCall<_userPackage_UpdateProfileRequest__Output, _userPackage_UpdateProfileResponse>;
  
  ValidateToken: grpc.handleUnaryCall<_userPackage_ValidateTokenReqeust__Output, _userPackage_ValidateTokenResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  GetProfile: MethodDefinition<_userPackage_GetProfileRequest, _userPackage_GetProfileResponse, _userPackage_GetProfileRequest__Output, _userPackage_GetProfileResponse__Output>
  Login: MethodDefinition<_userPackage_LoginRequest, _userPackage_LoginResponse, _userPackage_LoginRequest__Output, _userPackage_LoginResponse__Output>
  Signup: MethodDefinition<_userPackage_SignupRequest, _userPackage_SignupResponse, _userPackage_SignupRequest__Output, _userPackage_SignupResponse__Output>
  UpdateProfile: MethodDefinition<_userPackage_UpdateProfileRequest, _userPackage_UpdateProfileResponse, _userPackage_UpdateProfileRequest__Output, _userPackage_UpdateProfileResponse__Output>
  ValidateToken: MethodDefinition<_userPackage_ValidateTokenReqeust, _userPackage_ValidateTokenResponse, _userPackage_ValidateTokenReqeust__Output, _userPackage_ValidateTokenResponse__Output>
}
