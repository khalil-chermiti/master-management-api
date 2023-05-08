import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { MasterRepository } from 'src/master/master.repository';
import { ApplicationController } from './application.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { ApplicationRepository } from './application.repository';
import { CandidateRepository } from 'src/candidate/candidate.repository';

@Module({
  controllers: [ApplicationController],
  providers: [
    PrismaService,
    ApplicationService,
    MasterRepository,
    CandidateRepository,
    ApplicationRepository,
  ],
})
export class ApplicationModule {}
