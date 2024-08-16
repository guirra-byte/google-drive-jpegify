import AWS from 'aws-sdk';
import fs from 'node:fs';
import { Injectable } from '@nestjs/common';

@Injectable()
class S3Resources {
  private s3 = new AWS.S3({ endpoint: '' });

  async list(bucket: string) {
    const bucketUploads = this.s3.listObjectsV2({ Bucket: bucket });
    const { body } = bucketUploads.httpRequest;
    return body;
  }

  async download(bucket: string, resource_key: string) {
    let outFilepath: string = '';
    this.s3.getObject({ Bucket: bucket, Key: resource_key }, (err, output) => {
      if (err) throw err;

      outFilepath = `src/tmp/${resource_key}`;
      const writeStream = fs.createWriteStream(outFilepath);
      writeStream.write(output.Body);
    });

    return outFilepath;
  }

  async upload(data: {
    bucket: string;
    resource_key: string;
    filepath: string;
  }) {
    const fileStream = fs.createReadStream(data.filepath);
    this.s3.upload(
      {
        Bucket: data.bucket,
        Key: data.resource_key,
        Body: fileStream,
      },
      {},
      (err) => {
        if (err) throw err;
      },
    );
  }
}

export { S3Resources };
