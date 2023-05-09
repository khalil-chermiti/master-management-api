import { ApiProperty } from '@nestjs/swagger';

export class SigninInputDTO {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
