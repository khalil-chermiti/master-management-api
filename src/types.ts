export class ResponseSuccess<T> {
  public success: true;

  public statusCode: number;

  public data: T;

  constructor(success: true, statusCode: number, data: T) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ResponseError {
  public success: false;

  public statusCode: number;

  public error: string;

  constructor(success: false, statusCode: number, error: string) {
    this.success = success;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export type ResponseData<T> = ResponseSuccess<T> | ResponseError;
