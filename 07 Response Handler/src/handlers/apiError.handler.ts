interface IApiError {
  statusCode: number;
  message: string;
  success: boolean;
  data: null;
}

class ApiError extends Error implements IApiError {
  success: boolean;
  data: null;

  constructor(
    public statusCode: number,
    public message = "Something went wrong"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
  }
}

export default ApiError;
