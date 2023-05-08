import { ResponseData } from 'src/types';
import { Candidate } from '@prisma/client';
import { SignUpInputDTO } from './dto/signupInputDTO';
import { SigninInputDTO } from './dto/signinInputDTO';
import { CandidateService } from './candidate.service';
import { authGuard } from 'src/guards/authentication.guard';
import { isCandidate } from 'src/guards/authorization.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Post('signup')
  public async signup(
    @Body() signupInputDTO: SignUpInputDTO,
  ): Promise<ResponseData<{ candidate: Omit<Candidate, 'password'> }>> {
    try {
      const candidate = await this.candidateService.signup(signupInputDTO);
      delete candidate.password;
      return {
        success: true,
        statusCode: 200,
        data: { candidate: candidate },
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

  @Post('signin')
  public async signin(
    @Body() signinInputDTO: SigninInputDTO,
  ): Promise<ResponseData<{ token: string }>> {
    try {
      const token = await this.candidateService.signin(signinInputDTO);

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
  @UseGuards(isCandidate)
  @UseGuards(authGuard)
  public async test() {
    return 'hello';
  }
}
