import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public hashpassword = async (password: string): Promise<string> =>
    await bcrypt.hash(password, 12);

  public verifyPassword = async (
    password: string,
    hash: string,
  ): Promise<boolean> => await bcrypt.compare(password, hash);
}
