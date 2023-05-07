import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SigninDTO } from './dto/signinDTO';
import { Responsible } from '@prisma/client';
import { authJwt } from 'src/guards/jwtInterface';
import { ResponsibleRepository } from './responsible.respository';

@Injectable()
export class ResponsibleService {
  constructor(
    private responsibleRepository: ResponsibleRepository,
    private jwtService: JwtService,
  ) {}
  async signin(signinDTO: SigninDTO): Promise<string> {
    if (!signinDTO.login || !signinDTO.password)
      throw new BadRequestException('missing login or password');

    let responsible: Responsible;
    try {
      responsible = await this.responsibleRepository.findResponsibleByUserName(
        signinDTO.login,
      );
    } catch {
      throw new InternalServerErrorException();
    }

    if (!responsible) throw new BadRequestException('responsible not found');

    if (responsible.password !== signinDTO.password)
      throw new BadRequestException('wrong password');

    const payload: authJwt = { id: responsible.id.toString(), role: 'AMDIN' };

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
