type ResponseSucces<T> = {
  success: true;
  statusCode: number;
  data: T;
};

type ResponseError = {
  success: false;
  statusCode: number;
  error: string;
};

type ResponseData<T> = ResponseSucces<T> | ResponseError;
