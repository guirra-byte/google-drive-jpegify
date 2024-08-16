import { Module } from '@nestjs/common';
import { PresignUrlService } from './presign-url.service';
import { PresignUrlController } from './presign-url.controller';

@Module({
  controllers: [PresignUrlController],
  providers: [PresignUrlService],
})
export class PresignUrlModule {}
