import { Master } from '@prisma/client';
import { AddMasterDTO } from './dto/addMasterDto';
import { PrismaService } from 'src/common/services/hashingService/prismaService/prisma.service';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MasterRepository {
  constructor(private prismaService: PrismaService) {}

  public async addMaster(addMasterDTO: AddMasterDTO) {
    try {
      return await this.prismaService.master.create({
        data: {
          title: addMasterDTO.title,
          description: addMasterDTO.description,
          start_date: new Date(addMasterDTO.start_date),
          closing_date: new Date(addMasterDTO.closing_date),
          is_active: true,
        },
      });
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }

  public async removeMaster(masterID: number) {
    try {
      return await this.prismaService.master.delete({
        where: { id: masterID },
        include: { Application: true },
      });
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async extendMasterClosingDate(
    extendClosingDateDTO: ExtendClosingDateDTO,
  ) {
    return await this.prismaService.master.update({
      where: { id: extendClosingDateDTO.masterID },
      data: {
        closing_date: new Date(extendClosingDateDTO.date),
      },
    });
  }

  public async findMasterById(masterID: number) {
    return await this.prismaService.master.findUnique({
      where: { id: masterID },
    });
  }

  public async updateMasterStatus(updateMasterDTO: UpdateMasterStatusDTO) {
    return await this.prismaService.master.update({
      where: { id: updateMasterDTO.masterID },
      data: {
        is_active: updateMasterDTO.status,
      },
    });
  }

  public async getAvailableMaster(): Promise<Master[]> {
    return await this.prismaService.master.findMany({
      where: { is_active: true },
    });
  }
}
