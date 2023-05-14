import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './common/services/hashingService/prismaService/prisma.service';
import { ResponsibleModule } from './responsable/responsible.module';
import { MasterModule } from './master/master.module';
import { CandidateModule } from './candidate/candidate.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'dadoothisisthesecret',
    }),
    ResponsibleModule,
    MasterModule,
    CandidateModule,
    ApplicationModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
