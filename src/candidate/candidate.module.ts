import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { CandidateRepository } from './candidate.repository';
import { PrismaService } from 'src/common/services/hashingService/prismaService/prisma.service';
import { HashingService } from 'src/common/services/hashingService/hashingService';

@Module({
  controllers: [CandidateController],
  providers: [
    CandidateService,
    CandidateRepository,
    PrismaService,
    HashingService,
  ],
})
export class CandidateModule {}
