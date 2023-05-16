import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { MasterRepository } from './master.repository';
import { ApplicationRepository } from 'src/application/application.repository';
import { PrismaService } from 'src/common/services/hashingService/prismaService/prisma.service';

@Module({
  controllers: [MasterController],
  providers: [
    MasterService,
    ApplicationRepository,
    MasterRepository,
    PrismaService,
  ],
})
export class MasterModule {}
