import { Master } from '@prisma/client';

export interface UpdateMasterStatusResponseDTO {
  success: true;
  data: Master;
}
