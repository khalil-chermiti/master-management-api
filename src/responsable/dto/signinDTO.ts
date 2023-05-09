import { ApiProperty } from '@nestjs/swagger';

export class SigninDTO {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
