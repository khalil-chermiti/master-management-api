import {
  Get,
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
  Controller,
  HttpException,
} from '@nestjs/common';
import { Master } from '@prisma/client';
import { ResponseData } from 'src/types';
import { MasterService } from './master.service';
import { AddMasterDTO } from './dto/addMasterDto';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from 'src/guards/authentication.guard';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';

@Controller('master')
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Get()
  public async getMasters(): Promise<ResponseData<{ masters: Master[] }>> {
    try {
      const masters = await this.masterService.getAvailableMasters();
      return {
        success: true,
        statusCode: 200,
        data: {
          masters: masters,
        },
      };
    } catch (error) {
      if (error instanceof HttpException)
        return {
          success: false,
          statusCode: error.getStatus(),
          error: error.message,
        };
    }
  }

  @Post()
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async addMaster(
    @Body() addMasterDTO: AddMasterDTO,
  ): Promise<ResponseData<{ master: Master }>> {
    try {
      const master = await this.masterService.addMaster(addMasterDTO);
      return {
        success: true,
        statusCode: 200,
        data: { master: master },
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
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async deleteMaster(
    @Body('master_id') masterID: number,
  ): Promise<ResponseData<{ master: Master }>> {
    try {
      const master = await this.masterService.deleteMaster(masterID);
      return {
        success: true,
        statusCode: 200,
        data: { master: master },
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

  @Patch(':masterID/date')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateClosingDate(
    @Body() extendClosingDateDTO: ExtendClosingDateDTO,
  ): Promise<ResponseData<{ master: Master }>> {
    try {
      const master = await this.masterService.extendMasterClosingDate(
        extendClosingDateDTO,
      );
      return {
        success: true,
        statusCode: 200,
        data: { master: master },
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

  @Patch(':masterID/status')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateMasterStatus(
    @Body() updateMasterStatusDTO: UpdateMasterStatusDTO,
  ): Promise<ResponseData<{ master: Master }>> {
    try {
      const master = await this.masterService.updateMasterStatus(
        updateMasterStatusDTO,
      );
      return {
        success: true,
        statusCode: 200,
        data: { master: master },
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
