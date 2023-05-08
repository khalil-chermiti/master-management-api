import { Application } from '@prisma/client';
import { MasterRepository } from 'src/master/master.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { AddApplicationInputDTO } from './dto/addApplicationInputDTO';
import { CandidateRepository } from 'src/candidate/candidate.repository';
@Injectable()
export class ApplicationService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private candidateRepository: CandidateRepository,
    private masterRepository: MasterRepository,
  ) {}

  // add application
  public async addApplication(
    addApplicationDTO: AddApplicationInputDTO,
  ): Promise<Application> {
    const candidate = await this.candidateRepository.findCandidateByID(
      addApplicationDTO.candidate_id,
    );

    if (!candidate) throw new BadRequestException('no candidate with such ID');

    const master = await this.masterRepository.findMasterById(
      addApplicationDTO.master_id,
    );

    if (!master || !master.is_active)
      throw new BadRequestException('no master with such ID');

    const candidateApplicationsList =
      await this.applicationRepository.findApplicationsByCandidateID(
        addApplicationDTO.candidate_id,
      );

    const candidateDidApply = candidateApplicationsList.find(
      (application) =>
        application.candidate_id === addApplicationDTO.candidate_id,
    );

    if (candidateDidApply)
      throw new BadRequestException('already applied for this master');

    if (master.closing_date.getTime() < new Date().getTime())
      throw new BadRequestException(
        `sorry you can't apply after ${master.closing_date}`,
      );

    return await this.applicationRepository.addApplication(addApplicationDTO);
  }

  // remove application

  // get a candidate application

  // get all applications for a master
}
