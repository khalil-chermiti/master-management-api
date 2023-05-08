import { Application } from '@prisma/client';

export interface RemoveApplicationOutputDTO {
  success: true;
  data: Application;
}
