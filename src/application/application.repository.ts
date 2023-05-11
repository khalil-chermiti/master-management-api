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
  public findApplicationsByCandidateIDPopulated = async (candidateID: number) =>
    await this.prismaService.application.findMany({
      where: { candidate_id: candidateID },
      include: { master: true },
    });

  // remove application
  public removeApplicationByID = async (
    applicaitonID: number,
  ): Promise<Application> =>
    await this.prismaService.application.delete({
      where: {
        id: applicaitonID,
      },
    });

  public findApplicationByID = async (
    applicationID: number,
  ): Promise<Application> =>
    await this.prismaService.application.findUnique({
      where: { id: applicationID },
    });

  public acceptApplicationByID = async (
    applicationID: number,
  ): Promise<Application> =>
    await this.prismaService.application.update({
      where: { id: applicationID },
      data: {
        status: 'ACCEPTED',
      },
    });

  public rejectApplicationByID = async (
    applicationID: number,
  ): Promise<Application> =>
    await this.prismaService.application.update({
      where: { id: applicationID },
      data: {
        status: 'REJECTED',
      },
    });
}
