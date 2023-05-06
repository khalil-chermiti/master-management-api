import { MasterService } from './master.service';
import { AddMasterDTO } from './dto/addMasterDto';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from 'src/guards/authentication.guard';
import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExtendClosingDateDTO } from './dto/extendClosingDateDTO';
import { UpdateMasterStatusDTO } from './dto/updateMasterStatusDto';

@Controller('master')
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Post()
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async addMaster(@Body() addMasterDTO: AddMasterDTO) {
    console.log(addMasterDTO);
    return await this.masterService.addMaster(addMasterDTO);
  }

  @Delete()
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async deleteMaster(@Body('masterID') masterID: number) {
    return await this.masterService.deleteMaster(masterID);
  }

  @Patch(':masterID/date')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateClosingDate(
    @Body() extendClosingDateDTO: ExtendClosingDateDTO,
  ) {
    return await this.masterService.extendMasterClosingDate(
      extendClosingDateDTO,
    );
  }

  @Patch(':masterID/status')
  @UseGuards(isAdmin)
  @UseGuards(authGuard)
  public async updateMasterStatus(
    @Body() updateMasterStatusDTO: UpdateMasterStatusDTO,
  ) {
    return this.masterService.updateMasterStatus(updateMasterStatusDTO);
  }
}
