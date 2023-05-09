import { ApiProperty } from '@nestjs/swagger';

export class RemoveApplicationInputDTO {
  @ApiProperty()
  application_id: number;

  @ApiProperty()
  candidate_id: number;
}
