import { SignUpInputDTO } from './dto/signupInputDTO';
import { Body, Controller, Post } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { SignupOutputDTO } from './dto/signupOutputDTO';

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
}
