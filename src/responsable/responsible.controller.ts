import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResponsibleAuthGuard } from './responsible.guard';
import { ResponsibleService } from './responsible.service';
import { SigninDTO } from './dto/signinDTO';

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
  @UseGuards(ResponsibleAuthGuard)
  public async tes() {
    return 'hello';
  }
}
