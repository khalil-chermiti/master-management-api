import { Request } from 'express';
import { authJwt } from 'src/guards/jwtInterface';
import { isAdmin } from 'src/guards/authorization.guard';
import { ApplicationService } from './application.service';
import { authGuard } from 'src/guards/authentication.guard';
import { addApplicationOuputDTO } from './dto/addApplicationOutputDTO';
import { RemoveApplicationOutputDTO } from './dto/removeApplicationOutput';
import { AcceptApplicationOutputDTO } from './dto/acceptApplicaitonOutputDTO';
import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';

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

  @Delete()
  @UseGuards(authGuard)
  public async removeApplication(
    @Body('application_id') applicationID: number,
    @Req() request: Request,
  ): Promise<RemoveApplicationOutputDTO> {
    const auth = request['user'] as authJwt;
    const application = await this.applicationService.removeApplication({
      application_id: applicationID,
      candidate_id: parseInt(auth.id),
    });

    return {
      success: true,
      data: application,
    };
  }

  @Post('accept')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async acceptApplication(
    @Body('application_id') applicationID: number,
  ): Promise<AcceptApplicationOutputDTO> {
    const application = await this.applicationService.acceptApplication(
      applicationID,
    );

    return {
      success: true,
      data: application,
    };
  }

  @Post('reject')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async rejectApplication(
    @Body('application_id') applicationID: number,
  ): Promise<AcceptApplicationOutputDTO> {
    const application = await this.applicationService.rejectApplication(
      applicationID,
    );

    return {
      success: true,
      data: application,
    };
  }
}