import { Injectable } from '@nestjs/common';
import { S3Resources } from 'src/lib/s3';
import { SharedGoogleAuthService } from 'src/shared-google-auth/shared-google-auth.service';
import { google } from 'googleapis';
import fs from 'node:fs';
import axios from 'axios';

export interface ITransferImage {
  requester: {
    name: string;
    email: string;
  };
  resource_key: string;
  folderId: string;
}

@Injectable()
export class TransferImageService {
  constructor(
    private readonly s3Resources: S3Resources,
    private readonly sharedGoogleAuthService: SharedGoogleAuthService,
  ) {}

  async execute(data: ITransferImage) {
    const sharedAuth = await this.sharedGoogleAuthService.apply();
    if (!sharedAuth.credentials || !sharedAuth.oAuth2Client) {
      throw new Error('Cannot apply Google shared authentication!');
    }

    const { oAuth2Client } = sharedAuth;
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const bucketName = process.env.DESTINE_BUCKET;
    const downloadLocally = await this.s3Resources.download(
      bucketName,
      data.resource_key,
    );

    if (!downloadLocally) {
      throw new Error(
        `Cannot download S3 resource using this key: ${data.resource_key}`,
      );
    }

    const fileMetadata = {
      name: downloadLocally,
      parents: [],
    };

    if (data.folderId) {
      fileMetadata.parents = [data.folderId];
    }

    const media = {
      mimeType: 'image/x-canon-cr3', 
      body: fs.createReadStream(downloadLocally),
    };
    // Subir somente arquivos .cr3 na pasta CR3
    try {
      const response = await drive.files.create({
        requestBody: {
          name: data.resource_key,
          parents: data.folderId ? [data.folderId] : [],
        },
        media: media,
        fields: 'id, name, parents',
      });

      await axios.post('http://localhost:5433/gdrive/2jpeg', {
        ...data,
        originLocation: response.data.id,
      });

      console.log('File uploaded successfully:', response.data.id);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
