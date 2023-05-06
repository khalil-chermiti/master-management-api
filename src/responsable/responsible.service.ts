import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/signinDTO';
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

    return this.jwtService.sign({ id: responsible.id }, { expiresIn: '1h' });
  }
}
