import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
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
  public async signin(@Body() signinDTO: SigninDTO) {
    const token = await this.responsibleService.signin(signinDTO);

    if (!token)
      throw new InternalServerErrorException('error occured, please retry');

    return {
      token: token,
    };
  }

  @Get('test')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async tes() {
    return 'hello';
  }
}
