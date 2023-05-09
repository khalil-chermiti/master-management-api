import { ApiProperty } from '@nestjs/swagger';

export class DeleteMasterDTO {
  @ApiProperty()
  master_id: number;
}
