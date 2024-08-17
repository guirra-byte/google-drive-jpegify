import { Module } from '@nestjs/common';
import { PresignUrlModule } from './presign-url/presign-url.module';
import { SharedGoogleAuthService } from './shared-google-auth/shared-google-auth.service';
import { SharedGoogleAuthModule } from './shared-google-auth/shared-google-auth.module';
import { TransferImageModule } from './transfer-image/transfer-image.module';

@Module({
  imports: [PresignUrlModule, SharedGoogleAuthModule, TransferImageModule],
  controllers: [],
  providers: [SharedGoogleAuthService],
})
export class AppModule {}
