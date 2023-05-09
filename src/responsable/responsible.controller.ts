import { SigninDTO } from './dto/signinDTO';
import { ResponsibleService } from './responsible.service';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseData, ResponseError, ResponseSuccess } from 'src/types';

@Controller('admin')
export class ResponsibleController {
  constructor(private responsibleService: ResponsibleService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'admin logged in successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'admin login failed',
    type: ResponseError,
  })
  public async signin(
    @Body() signinDTO: SigninDTO,
  ): Promise<ResponseData<{ token: string }>> {
    try {
      const token = await this.responsibleService.signin(signinDTO);
      return {
        success: true,
        statusCode: 200,
        data: {
          token: token,
        },
      };
    } catch (error: any) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }
}
