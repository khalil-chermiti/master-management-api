import {
  Get,
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
  Controller,
  InternalServerErrorException,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { AddMasterDTO } from './dto/addMasterDto';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from 'src/guards/authentication.guard';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { AddMasterResponseDTO } from './dto/addMasterResponseDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';
import { DeleteMasterResponseDTO } from './dto/DeleteMasterResponseDTO';
import { GetAvailableMastersDTO } from './dto/getAvailableMastersResponseDTO';
import { ExtendClosingDateResponseDTO } from './dto/extendMasterStatusResponseDTO';
import { UpdateMasterStatusResponseDTO } from './dto/updateMasterStatusResponseDTO';

@Controller('master')
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Get()
  public async getMasters(): Promise<GetAvailableMastersDTO> {
    try {
      const masters = await this.masterService.getAvailableMasters();
      return {
        success: true,
        data: masters,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async addMaster(
    @Body() addMasterDTO: AddMasterDTO,
  ): Promise<AddMasterResponseDTO> {
    try {
      const master = await this.masterService.addMaster(addMasterDTO);
      return {
        success: true,
        data: master,
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Delete()
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async deleteMaster(
    @Body('masterID') masterID: number,
  ): Promise<DeleteMasterResponseDTO> {
    try {
      const master = await this.masterService.deleteMaster(masterID);
      return {
        success: true,
        data: master,
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':masterID/date')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateClosingDate(
    @Body() extendClosingDateDTO: ExtendClosingDateDTO,
  ): Promise<ExtendClosingDateResponseDTO> {
    try {
      const master = await this.masterService.extendMasterClosingDate(
        extendClosingDateDTO,
      );
      return {
        success: true,
        data: master,
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':masterID/status')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateMasterStatus(
    @Body() updateMasterStatusDTO: UpdateMasterStatusDTO,
  ): Promise<UpdateMasterStatusResponseDTO> {
    try {
      const master = await this.masterService.updateMasterStatus(
        updateMasterStatusDTO,
      );
      return {
        success: true,
        data: master,
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
