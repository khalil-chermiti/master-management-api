import { Application } from '@prisma/client';

export interface AcceptApplicationOutputDTO {
  success: true;
  data: Application;
}
