import { Controller, Post, Req, Res } from '@nestjs/common';
import { TransferImageService, ITransferImage } from './transfer-image.service';
import { Request, Response } from 'express';

@Controller('transfer-image')
export class TransferImageController {
  constructor(private readonly transferImageService: TransferImageService) {}

  @Post()
  async transfer(@Req() request: Request, @Res() response: Response) {
    const data: ITransferImage = request.body;
    await this.transferImageService.execute(data);

    return response.status(201).send();
  }
}
