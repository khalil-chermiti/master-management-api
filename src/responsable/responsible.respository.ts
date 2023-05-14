import { PrismaService } from 'src/common/services/hashingService/prismaService/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponsibleRepository {
  constructor(private prismaService: PrismaService) {}

  public async findResponsibleByUserName(login: string) {
    return this.prismaService.responsible.findUnique({
      where: { login: login },
    });
  }
}
