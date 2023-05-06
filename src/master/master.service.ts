import { AddMasterDTO } from './dto/addMasterDto';
import { MasterRepository } from './master.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MasterService {
  constructor(private masterRespository: MasterRepository) {}

  public async addMaster(addMaserDTO: AddMasterDTO) {
    // validate date
    if (
      this.startTimeIsInFuture(addMaserDTO.start_date) &&
      this.timeIntervalGreaterThanOneDay(
        addMaserDTO.closing_date,
        addMaserDTO.start_date,
      )
    )
      return await this.masterRespository.addMaster(addMaserDTO);
    throw new BadRequestException('invalid date');
  }

  // delete master degree
  public async deleteMaster(masterID: number) {
    return await this.masterRespository.removeMaster(masterID);
  }

  private timeIntervalGreaterThanOneDay = (
    date1: string | Date,
    date2: string | Date,
  ) => new Date(date1).getTime() - new Date(date2).getTime() > 86400000;

  private startTimeIsInFuture = (date: string | Date) =>
    new Date(date).getTime() > new Date().getTime();
}
