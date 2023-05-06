import { PrismaService } from 'src/prismaService/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ResponsibleRepository {
  constructor(private prismaService: PrismaService) {}

  public async findResponsibleByUserName(login: string) {
    try {
      return this.prismaService.responsible.findUnique({
        where: { login: login },
      });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
