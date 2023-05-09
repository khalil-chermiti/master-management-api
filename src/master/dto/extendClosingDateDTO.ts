import { ApiProperty } from '@nestjs/swagger';

export class ExtendClosingDateDTO {
  @ApiProperty()
  masterID: number;

  @ApiProperty()
  date: Date | string;
}
