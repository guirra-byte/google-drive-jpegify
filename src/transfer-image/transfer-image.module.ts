import { Module } from '@nestjs/common';
import { TransferImageService } from './transfer-image.service';
import { TransferImageController } from './transfer-image.controller';

@Module({
  controllers: [TransferImageController],
  providers: [TransferImageService],
})
export class TransferImageModule {}
