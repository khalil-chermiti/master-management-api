import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { PrismaService } from 'src/prismaService/prisma.service';
import { ResponsibleController } from './responsible.controller';
import { ResponsibleRepository } from './responsible.respository';

@Module({
  controllers: [ResponsibleController],
  providers: [PrismaService, ResponsibleService, ResponsibleRepository],
})
export class ResponsibleModule {}
