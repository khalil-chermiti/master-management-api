import { Master } from '@prisma/client';

export interface DeleteMasterResponseDTO {
  success: true;
  data: Master;
}
