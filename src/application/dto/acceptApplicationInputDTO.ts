import { ApiProperty } from '@nestjs/swagger';

export class AcceptApplicationInputDTO {
  @ApiProperty()
  application_id: string;
}
