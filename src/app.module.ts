import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prismaService/prisma.service';
import { ResponsibleModule } from './responsable/responsible.module';
import { MasterModule } from './master/master.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'dadoothisisthesecret',
    }),
    ResponsibleModule,
    MasterModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
