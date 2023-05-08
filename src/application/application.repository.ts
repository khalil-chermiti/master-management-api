import { Injectable } from '@nestjs/common';
import { Application } from '@prisma/client';
import { PrismaService } from 'src/prismaService/prisma.service';
import { AddApplicationInputDTO } from './dto/addApplicationInputDTO';

@Injectable()
export class ApplicationRepository {
  constructor(private prismaService: PrismaService) {}

  // add application
  public addApplication = async (
    addApplicationDTO: AddApplicationInputDTO,
  ): Promise<Application> =>
    await this.prismaService.application.create({
      data: {
        master_id: addApplicationDTO.master_id,
        candidate_id: addApplicationDTO.candidate_id,
      },
    });

  public findApplicationsByCandidateID = async (
    candidateID: number,
  ): Promise<Application[]> =>
    await this.prismaService.application.findMany({
      where: { candidate_id: candidateID },
    });

  // remove application

  // get a candidate application

  // get all applications for a master
}
