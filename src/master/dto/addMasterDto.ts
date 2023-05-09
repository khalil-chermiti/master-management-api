import { ApiProperty } from '@nestjs/swagger';

export class AddMasterDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  closing_date: Date;

  @ApiProperty()
  is_active?: boolean;
}
