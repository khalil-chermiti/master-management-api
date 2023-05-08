import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SigninDTO } from './dto/signinDTO';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from '../guards/authentication.guard';
import { ResponsibleService } from './responsible.service';

@Controller('admin')
export class ResponsibleController {
  constructor(private responsibleService: ResponsibleService) {}

  @Post('login')
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

  @Get('test')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async tes() {
    return 'hello';
  }
}
