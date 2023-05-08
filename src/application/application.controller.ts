import { Request } from 'express';
import { ResponseData } from 'src/types';
import { Application } from '@prisma/client';
import { authJwt } from 'src/guards/jwtInterface';
import { isAdmin } from 'src/guards/authorization.guard';
import { ApplicationService } from './application.service';
import { authGuard } from 'src/guards/authentication.guard';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Post()
  @UseGuards(authGuard)
  public async addApplication(
    @Body('master_id') masterID: number,
    @Req() request: Request,
  ): Promise<ResponseData<{ application: Application }>> {
    const auth = request['user'] as authJwt;
    try {
      const application = await this.applicationService.addApplication({
        candidate_id: parseInt(auth.id),
        master_id: masterID,
      });
      return {
        success: true,
        statusCode: 200,
        data: { application: application },
      };
    } catch (error: any) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }

  @Delete()
  @UseGuards(authGuard)
  public async removeApplication(
    @Body('application_id') applicationID: number,
    @Req() request: Request,
  ): Promise<ResponseData<{ application: Application }>> {
    const auth = request['user'] as authJwt;
    try {
      const application = await this.applicationService.removeApplication({
        application_id: applicationID,
        candidate_id: parseInt(auth.id),
      });

      return {
        success: true,
        statusCode: 200,
        data: { application: application },
      };
    } catch (error: any) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }

  @Post('accept')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async acceptApplication(
    @Body('application_id') applicationID: number,
  ): Promise<ResponseData<{ application: Application }>> {
    try {
      const application = await this.applicationService.acceptApplication(
        applicationID,
      );

      return {
        success: true,
        statusCode: 200,
        data: { application: application },
      };
    } catch (error: any) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }

  @Post('reject')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async rejectApplication(
    @Body('application_id') applicationID: number,
  ): Promise<ResponseData<{ application: Application }>> {
    try {
      const application = await this.applicationService.rejectApplication(
        applicationID,
      );

      return {
        success: true,
        statusCode: 200,
        data: { application: application },
      };
    } catch (error: any) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }
}
