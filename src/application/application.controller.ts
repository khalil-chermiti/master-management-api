import { Request } from 'express';
import { authJwt } from 'src/guards/jwtInterface';
import { ApplicationService } from './application.service';
import { authGuard } from 'src/guards/authentication.guard';
import { addApplicationOuputDTO } from './dto/addApplicationOutputDTO';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Post()
  @UseGuards(authGuard)
  public async addApplication(
    @Body('master_id') masterID: number,
    @Req() request: Request,
  ): Promise<addApplicationOuputDTO> {
    const auth = request['user'] as authJwt;
    const application = await this.applicationService.addApplication({
      candidate_id: parseInt(auth.id),
      master_id: masterID,
    });
    return {
      success: true,
      data: application,
    };
  }
}
