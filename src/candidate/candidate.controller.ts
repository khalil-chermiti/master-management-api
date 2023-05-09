import { Candidate } from '@prisma/client';
import { SignUpInputDTO } from './dto/signupInputDTO';
import { SigninInputDTO } from './dto/signinInputDTO';
import { CandidateService } from './candidate.service';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ResponseData, ResponseError, ResponseSuccess } from 'src/types';
import { Body, Controller, HttpException, Post } from '@nestjs/common';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Post('signup')
  @ApiOkResponse({
    description: 'candidate signed up successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'candidate signup failed',
    type: ResponseError,
  })
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
  @ApiOkResponse({
    description: 'candidate signed in successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'candidate failed to sign in',
    type: ResponseError,
  })
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
}
