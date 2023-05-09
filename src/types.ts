import { ApiProperty } from '@nestjs/swagger';

export class ResponseSuccess<T> {
  @ApiProperty()
  public success: true;

  @ApiProperty()
  public statusCode: number;

  @ApiProperty()
  public data: T;

  constructor(success: true, statusCode: number, data: T) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ResponseError {
  @ApiProperty()
  public success: false;

  @ApiProperty()
  public statusCode: number;

  @ApiProperty()
  public error: string;

  constructor(success: false, statusCode: number, error: string) {
    this.success = success;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export type ResponseData<T> = ResponseSuccess<T> | ResponseError;
