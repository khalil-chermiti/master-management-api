import { Master } from '@prisma/client';
import { AddMasterDTO } from './dto/addMasterDto';
import { MasterRepository } from './master.repository';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApplicationRepository } from 'src/application/application.repository';

@Injectable()
export class MasterService {
  constructor(
    private masterRepository: MasterRepository,
    private applicationRepository: ApplicationRepository,
  ) {}

  public async addMaster(addMaserDTO: AddMasterDTO) {
    // validate date
    if (
      this.startTimeIsInFuture(addMaserDTO.start_date) &&
      this.timeIntervalGreaterThanOneDay(
        addMaserDTO.closing_date,
        addMaserDTO.start_date,
      )
    )
      return await this.masterRepository.addMaster(addMaserDTO);
    throw new BadRequestException('invalid date');
  }

  public async deleteMaster(masterID: number) {
    await this.applicationRepository.deleteApplicationsByMasterID(masterID);
    return await this.masterRepository.removeMaster(masterID);
  }

  public async extendMasterClosingDate(
    extendClosingDateDTO: ExtendClosingDateDTO,
  ) {
    let master: Master;
    try {
      master = await this.masterRepository.findMasterById(
        extendClosingDateDTO.masterID,
      );
    } catch {
      throw new BadRequestException('invalid input data');
    }

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
      return await this.masterRepository.extendMasterClosingDate(
        extendClosingDateDTO,
      );
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }

  public async updateMasterStatus(updateMasterDTO: UpdateMasterStatusDTO) {
    try {
      return await this.masterRepository.updateMasterStatus(updateMasterDTO);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  public async getAvailableMasters(): Promise<Master[]> {
    try {
      return await this.masterRepository.getAvailableMaster();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  private timeIntervalGreaterThanOneDay = (
    date1: string | Date,
    date2: string | Date,
  ) => new Date(date1).getTime() - new Date(date2).getTime() > 86400000;

  private startTimeIsInFuture = (date: string | Date) =>
    new Date(date).getTime() > new Date().getTime();

  public getMasterById = async (master_id: number) =>
    await this.masterRepository.findMasterById(master_id);
}
