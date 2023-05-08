import { Master } from '@prisma/client';

export interface GetAvailableMastersDTO {
  success: true;
  data: Master[];
}
