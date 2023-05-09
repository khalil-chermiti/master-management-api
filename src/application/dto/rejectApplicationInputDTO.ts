import { ApiProperty } from '@nestjs/swagger';

export class RejectApplicationInputDTO {
  @ApiProperty()
  application_id: number;
}
