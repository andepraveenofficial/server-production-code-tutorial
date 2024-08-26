class ApiError extends Error {
  public statusCode: number;
  public data: any;
  public success: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
  }
}

export default ApiError;
