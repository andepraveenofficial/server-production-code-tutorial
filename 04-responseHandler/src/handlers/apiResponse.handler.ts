import { Response } from "express";

interface IApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

class ApiResponse<T> implements IApiResponse<T> {
  public statusCode: number;
  public message: string;
  public success: boolean;
  public data: T;

  constructor(res: Response, statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 400;
    this.data = data;

    // Automatically send the response
    this.send(res);
  }

  private send(res: Response) {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data
    });
  }
}

export default ApiResponse;