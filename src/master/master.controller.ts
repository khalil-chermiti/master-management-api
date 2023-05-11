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
import { MasterService } from './master.service';
import { AddMasterDTO } from './dto/addMasterDto';
import { DeleteMasterDTO } from './dto/deleteMasterDTO';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from 'src/guards/authentication.guard';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseData, ResponseError, ResponseSuccess } from 'src/types';

@Controller('master')
export class MasterController {
  constructor(private masterService: MasterService) { }

  @Get()
  @ApiOkResponse({
    description: 'get list of available masters',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: 'failed to get list of masters',
    type: ResponseError,
  })
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
  @ApiOkResponse({
    description: 'add master',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "can't add master due to error",
    type: ResponseError,
  })
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
  @ApiOkResponse({
    description: 'master deleted successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "can't delete master due to error",
    type: ResponseError,
  })
  public async deleteMaster(
    @Body() deleteMasterDTO: DeleteMasterDTO,
  ): Promise<ResponseData<{ master: Master }>> {
    try {
      const master = await this.masterService.deleteMaster(
        deleteMasterDTO.master_id,
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

  @Patch(':masterID/date')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  @ApiOkResponse({
    description: 'update closing date successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "can't update master closing date due to error",
    type: ResponseError,
  })
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
  @ApiOkResponse({
    description: 'update master status successfully',
    type: ResponseSuccess,
  })
  @ApiBadRequestResponse({
    description: "can't update master status due to error",
    type: ResponseError,
  })
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
