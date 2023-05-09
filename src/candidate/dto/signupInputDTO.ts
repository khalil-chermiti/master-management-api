import { ApiProperty } from '@nestjs/swagger';

export class SignUpInputDTO {
  @ApiProperty()
  cin: number;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  password_match: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone_number: number;

  @ApiProperty()
  addresse: string;

  @ApiProperty()
  postal_code: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;
}
