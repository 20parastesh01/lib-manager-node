export class CustomError extends Error {}

export class UserException extends CustomError {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, UserException.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toObject(): { message: string; code: number } {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
