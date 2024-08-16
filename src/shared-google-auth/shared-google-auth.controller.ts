import { Controller } from '@nestjs/common';
import { Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SharedGoogleAuthService } from './shared-google-auth.service';

@Controller('shared-google-auth')
export class SharedGoogleAuthController {
  constructor(
    private readonly sharedGoogleAuthService: SharedGoogleAuthService,
  ) {}

  @Post('')
  async handleSharedAuth(@Req() request: Request, @Res() response: Response) {
    const sharedAuth = request.body;
    await this.sharedGoogleAuthService.store(sharedAuth);
    return response.status(200).send();
  }
}
