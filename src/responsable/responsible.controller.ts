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
import { SigninResponseDTO } from './dto/signinResponseDTO';

@Controller('admin')
export class ResponsibleController {
  constructor(private responsibleService: ResponsibleService) {}

  @Post('login')
  public async signin(
    @Body() signinDTO: SigninDTO,
  ): Promise<SigninResponseDTO> {
    const token = await this.responsibleService.signin(signinDTO);

    if (!token)
      throw new InternalServerErrorException('error occured, please retry');

    return {
      success: true,
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
