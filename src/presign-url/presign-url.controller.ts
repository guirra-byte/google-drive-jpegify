import { Controller } from '@nestjs/common';
import { PresignUrlService } from './presign-url.service';
import { Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('presign-url')
export class PresignUrlController {
  constructor(private readonly presignUrlService: PresignUrlService) {}

  @Post('')
  async presign(@Req() request: Request, @Res() response: Response) {
    const filename = request.body;
    const urlPresigned = await this.presignUrlService.presign(filename);
    return response.status(201).send({ urlPresigned });
  }
}
