import { MasterService } from './master.service';
import { AddMasterDTO } from './dto/addMasterDto';
import { isAdmin } from 'src/guards/authorization.guard';
import { authGuard } from 'src/guards/authentication.guard';
import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

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
}
