// Define the types for status codes and error descriptions
interface StatusCodes {
  OK: number;
  BAD_REQUEST: number;
  UN_AUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_ERROR: number;
}

const STATUS_CODES: StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// BaseError class with TypeScript typing
class BaseError extends Error {
  public statusCode: number;

  constructor(name: string, statusCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

/* -----> Custom Errors <----- */

// 500 Internal Error
class InternalError extends BaseError {
  constructor(description = "Internal Error") {
    super("InternalError", STATUS_CODES.INTERNAL_ERROR, description);
  }
}

// 404 Not Found
class NotFoundError extends BaseError {
  constructor(description = "Not Found") {
    super("NotFoundError", STATUS_CODES.NOT_FOUND, description);
  }
}

// 400 Bad Request
class BadRequestError extends BaseError {
  constructor(description = "Bad Request") {
    super("BadRequestError", STATUS_CODES.BAD_REQUEST, description);
  }
}

// 403 Unauthorized
class UnauthorizedError extends BaseError {
  constructor(description = "Unauthorized") {
    super("UnauthorizedError", STATUS_CODES.UN_AUTHORIZED, description);
  }
}

export { InternalError, NotFoundError, BadRequestError, UnauthorizedError };
