import { AddMasterDTO } from './dto/addMasterDto';
import { PrismaService } from 'src/prismaService/prisma.service';
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
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  public async removeMaster(masterID: number) {
    try {
      return await this.prismaService.master.delete({
        where: { id: masterID },
      });
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }
}
