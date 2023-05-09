import { ApiProperty } from '@nestjs/swagger';

export class UpdateMasterStatusDTO {
  @ApiProperty()
  masterID: number;

  @ApiProperty()
  status: boolean;
}
