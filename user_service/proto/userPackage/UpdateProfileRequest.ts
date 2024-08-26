// Original file: proto/user.proto


export interface UpdateProfileRequest {
  'token'?: (string);
  'email'?: (string);
  'name'?: (string);
  '_email'?: "email";
  '_name'?: "name";
}

export interface UpdateProfileRequest__Output {
  'token'?: (string);
  'email'?: (string);
  'name'?: (string);
}
