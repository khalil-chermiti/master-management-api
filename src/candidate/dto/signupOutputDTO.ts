import { Candidate } from '@prisma/client';

export interface SignupOutputDTO {
  success: true;
  data: Omit<Candidate, 'password'>;
}
