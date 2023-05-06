import { AddMasterDTO } from './dto/addMasterDto';
import { extendClosingDateDTO } from './dto/extendClosingDateDTO';
import { MasterRepository } from './master.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

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

  public async deleteMaster(masterID: number) {
    return await this.masterRespository.removeMaster(masterID);
  }

  public async extendMasterClosingDate(
    extendClosingDateDTO: extendClosingDateDTO,
  ) {
    const master = await this.masterRespository.findMasterById(
      extendClosingDateDTO.masterID,
    );

    if (!master) throw new BadRequestException('wrong master id');

    if (
      !this.timeIntervalGreaterThanOneDay(
        extendClosingDateDTO.date,
        master.closing_date,
      )
    )
      throw new BadRequestException(
        'new date must be one day greater than old date',
      );

    try {
      await this.masterRespository.extendMasterClosingDate(
        extendClosingDateDTO,
      );
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private timeIntervalGreaterThanOneDay = (
    date1: string | Date,
    date2: string | Date,
  ) => new Date(date1).getTime() - new Date(date2).getTime() > 86400000;

  private startTimeIsInFuture = (date: string | Date) =>
    new Date(date).getTime() > new Date().getTime();
}
