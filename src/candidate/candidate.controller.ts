import { SignUpInputDTO } from './dto/signupInputDTO';
import { SigninInputDTO } from './dto/signinInputDTO';
import { CandidateService } from './candidate.service';
import { SignupOutputDTO } from './dto/signupOutputDTO';
import { SigninOutputDTO } from './dto/signinOutputDTO';
import { authGuard } from 'src/guards/authentication.guard';
import { isCandidate } from 'src/guards/authorization.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('candidate')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Post('signup')
  public async signup(
    @Body() signupInputDTO: SignUpInputDTO,
  ): Promise<SignupOutputDTO> {
    const candidate = await this.candidateService.signup(signupInputDTO);
    delete candidate.password;

    return {
      success: true,
      data: candidate,
    };
  }

  @Post('signin')
  public async signin(
    @Body() signinInputDTO: SigninInputDTO,
  ): Promise<SigninOutputDTO> {
    const token = await this.candidateService.signin(signinInputDTO);

    return {
      success: true,
      data: {
        token: token,
      },
    };
  }

  @Get('test')
  @UseGuards(isCandidate)
  @UseGuards(authGuard)
  public async test() {
    return 'hello';
  }
}
