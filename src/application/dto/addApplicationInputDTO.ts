import { ApiProperty } from '@nestjs/swagger';

export class AddApplicationInputDTO {
  @ApiProperty()
  candidate_id: number;

  @ApiProperty()
  master_id: number;
}
