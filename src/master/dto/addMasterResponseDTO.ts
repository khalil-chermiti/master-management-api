import { Master } from '@prisma/client';

export interface AddMasterResponseDTO {
  success: true;
  data: Master;
}
