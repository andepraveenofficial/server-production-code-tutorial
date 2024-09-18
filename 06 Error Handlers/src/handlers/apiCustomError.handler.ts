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
  
  // BaseError
  class BaseError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this);
    }
  }
  
  /* -----> Custom Errors <----- */
  
  // 500 Internal Error
  class InternalError extends BaseError {
    constructor(message = "Internal Error") {
      super(STATUS_CODES.INTERNAL_ERROR, message);
    }
  }
  
  // 404 Not Found
  class NotFoundError extends BaseError {
    constructor(message = "Not Found") {
      super(STATUS_CODES.NOT_FOUND, message);
    }
  }
  
  // 400 Bad Request
  class BadRequestError extends BaseError {
    constructor(message = "Bad Request") {
      super(STATUS_CODES.BAD_REQUEST, message);
    }
  }
  
  // 403 Unauthorized
  class UnauthorizedError extends BaseError {
    constructor(message = "Unauthorized") {
      super(STATUS_CODES.UN_AUTHORIZED, message);
    }
  }
  
  export { InternalError, NotFoundError, BadRequestError, UnauthorizedError };
  