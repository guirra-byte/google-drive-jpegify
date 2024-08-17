import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class PresignUrlService {
  private s3Client = new S3Client({});
  async presign(filename: string) {
    const signedUrl = await getSignedUrl(
      this.s3Client,
      new PutObjectCommand({
        Bucket: 'to-jpegify',
        Key: filename,
        ContentType: 'image/cr3',
      }),
    );

    return signedUrl;
  }
}
