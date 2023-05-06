import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/signinDTO';
import { authJwt } from 'src/guards/jwtInterface';
import { ResponsibleRepository } from './responsible.respository';

@Injectable()
export class ResponsibleService {
  constructor(
    private responsibleRepository: ResponsibleRepository,
    private jwtService: JwtService,
  ) {}
  async signin(signinDTO: SigninDTO): Promise<string> {
    const responsible =
      await this.responsibleRepository.findResponsibleByUserName(
        signinDTO.login,
      );

    if (!responsible) throw new NotFoundException('username is not found!');

    if (responsible.password !== signinDTO.password)
      throw new NotAcceptableException('wrong password!');

    const payload: authJwt = { id: responsible.id.toString(), role: 'AMDIN' };

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
