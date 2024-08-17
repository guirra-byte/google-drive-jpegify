import { Module } from '@nestjs/common';
import { SharedGoogleAuthController } from './shared-google-auth.controller';
import { SharedGoogleAuthService } from './shared-google-auth.service';

@Module({
  controllers: [SharedGoogleAuthController],
  providers: [SharedGoogleAuthService],
})
export class SharedGoogleAuthModule {}
