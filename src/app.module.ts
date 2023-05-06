import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prismaService/prisma.service';
import { ResponsibleModule } from './responsable/responsible.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'dadoothisisthesecret',
    }),
    ResponsibleModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
