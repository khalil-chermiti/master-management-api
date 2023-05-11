import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { z } from 'zod';
import { JwtService } from '@nestjs/jwt';
import { Candidate } from '@prisma/client';
import { authJwt } from 'src/guards/jwtInterface';
import { SignUpInputDTO } from './dto/signupInputDTO';
import { SigninInputDTO } from './dto/signinInputDTO';
import { CandidateRepository } from './candidate.repository';
import { HashingService } from 'src/hashingService/hashingService';

@Injectable()
export class CandidateService {
  constructor(
    private candidateRepository: CandidateRepository,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  public async signup(signupInputDTO: SignUpInputDTO): Promise<Candidate> {
    const result = this.validateUserInputData(signupInputDTO);

    if (result.success === false)
      throw new BadRequestException(result.error.message);

    const emailExists = await this.candidateRepository.findCandidateByEmail(
      result.data.email,
    );

    if (emailExists) throw new ConflictException('email already exists');

    const phoneExists =
      await this.candidateRepository.findCandidateByPhoneNumber(
        result.data.phone_number,
      );

    if (phoneExists) throw new ConflictException('phone number already exists');

    const usernameExists =
      await this.candidateRepository.findCandidateByUsername(result.data.login);

    if (usernameExists) throw new ConflictException('username already exists');

    const CINExists = await this.candidateRepository.findCandidateByCIN(
      result.data.cin,
    );

    if (CINExists) throw new ConflictException('CIN already exists');

    return await this.candidateRepository.createCandidate({
      cin: result.data.cin,
      first_name: result.data.last_name,
      last_name: result.data.last_name,
      login: result.data.login,
      email: result.data.email,
      password: await this.hashingService.hashpassword(result.data.password),
      addresse: result.data.addresse,
      city: result.data.city,
      country: result.data.country,
      phone_number: result.data.phone_number,
      postal_code: result.data.postal_code,
    });
  }

  private validateUserInputData(data: SignUpInputDTO) {
    const isValid = this.CandidateSignupSchema.safeParse(data);
    return isValid;
  }

  private CandidateSignupSchema = z
    .object({
      cin: z.number().gte(10_000_000).lte(99_999_999),
      login: z.string().min(3),
      last_name: z.string().min(3),
      first_name: z.string().min(3),
      password: z.string().min(4),
      password_match: z.string().min(4),
      email: z.string().email(),
      phone_number: z.number().gte(10_000_000).lte(99_999_999),
      addresse: z.string(),
      postal_code: z.number(),
      country: z.string(),
      city: z.string(),
    })
    .superRefine(({ password_match, password }, ctx) => {
      if (password_match !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
        });
      }
    });

  public async signin(signinDTO: SigninInputDTO): Promise<string> {
    const result = this.validateCandidateSigninInput(signinDTO);

    if (result.success === false)
      throw new BadRequestException(result.error.issues[0].message);

    const candidate = await this.candidateRepository.findCandidateByUsername(
      result.data.login,
    );

    if (!candidate) throw new BadRequestException('username does not exist');

    const isValidPassword = await this.hashingService.verifyPassword(
      result.data.password,
      candidate.password,
    );

    if (!isValidPassword) throw new BadRequestException('wrong password');

    const payload = {
      id: candidate.id.toString(),
      role: 'CANDIDATE',
    } as authJwt;

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return token;
  }

  private validateCandidateSigninInput = (data: SigninInputDTO) =>
    z
      .object({
        login: z.string().min(3),
        password: z.string(),
      })
      .safeParse(data);
}
