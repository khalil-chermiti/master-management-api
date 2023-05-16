import { Request } from 'express';
import { Application } from '@prisma/client';
import { authJwt } from 'src/guards/jwtInterface';
import { isAdmin } from 'src/guards/authorization.guard';
import { ApplicationService } from './application.service';
import { authGuard } from 'src/guards/authentication.guard';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ResponseData, ResponseError, ResponseSuccess } from 'src/types';
import { AcceptApplicationInputDTO } from './dto/acceptApplicationInputDTO';
import { RejectApplicationInputDTO } from './dto/rejectApplicationInputDTO';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/common/decorators/AuthDecorator';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  @UseGuards(authGuard)
  public async getCandidateApplications(
    @Auth() auth: authJwt,
  ): Promise<ResponseData<Application[]>> {
    try {
      const applications =
        await this.applicationService.getCandidateApplications(
          parseInt(auth.id),
        );
      return {
        success: true,
        statusCode: 200,
        data: applications,
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

  @Post()
  @UseGuards(authGuard)
  @ApiOkResponse({
    description: 'candidate applied for master successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'candidate failed to apply for master',
    type: ResponseError,
  })
  public async addApplication(
    @Body('master_id') masterID: number,
    @Auth() auth: authJwt,
  ): Promise<ResponseData<{ application: Application }>> {
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
  @ApiOkResponse({
    description: 'candidate removed application successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'candidate failed to remove application',
    type: ResponseError,
  })
  public async removeApplication(
    @Body('application_id') applicationID: number,
    @Auth() auth: authJwt,
  ): Promise<ResponseData<{ application: Application }>> {
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
  @ApiOkResponse({
    description: 'admin accepted application',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "admin could't accept application",
    type: ResponseError,
  })
  public async acceptApplication(
    @Body() acceptApplicationDTO: AcceptApplicationInputDTO,
  ): Promise<ResponseData<{ application: Application }>> {
    try {
      const application = await this.applicationService.acceptApplication(
        acceptApplicationDTO.application_id,
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
  @ApiOkResponse({
    description: 'admin rejected application',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "admin could't reject application",
    type: ResponseError,
  })
  public async rejectApplication(
    @Body() rejectApplicationInputDTO: RejectApplicationInputDTO,
  ): Promise<ResponseData<{ application: Application }>> {
    try {
      const application = await this.applicationService.rejectApplication(
        rejectApplicationInputDTO.application_id,
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
