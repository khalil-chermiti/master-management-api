import { Application } from '@prisma/client';

export interface addApplicationOuputDTO {
  success: true;
  data: Application;
}
