import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { MasterRepository } from './master.repository';
import { PrismaService } from 'src/prismaService/prisma.service';

@Module({
  controllers: [MasterController],
  providers: [MasterService, MasterRepository, PrismaService],
})
export class MasterModule {}
