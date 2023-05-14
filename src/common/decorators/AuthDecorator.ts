import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { authJwt } from "src/guards/jwtInterface";

/** extract auth object from the request header */
export const Auth = createParamDecorator<authJwt>(
  (data : never , ctx : ExecutionContext) => {
    return ctx.switchToHttp().getRequest()["user"] as authJwt;
  }
);