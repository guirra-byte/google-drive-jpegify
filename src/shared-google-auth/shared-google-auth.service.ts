import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import * as fs from 'node:fs';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

interface ISharedGoogleAuth {
  credentials: Credentials;
  client: { client_id: string; client_secret: string; redirect_uris: string[] };
}

@Injectable()
export class SharedGoogleAuthService {
  async store(sharedAuth: string) {
    if (sharedAuth) {
      const secretKey = process.env.SHARE_GOOGLE_AUTH_SECRET_KEY;
      const decryptSharedAuth = JSON.stringify(
        jwt.verify(sharedAuth, secretKey),
      );

      if (decryptSharedAuth) {
        const parseSharedAuth: ISharedGoogleAuth =
          JSON.parse(decryptSharedAuth);

        const copyFiles = [
          {
            copyFilename: 'access_token.json',
            params: parseSharedAuth.credentials,
          },
          {
            copyFilename: 'client_secrets.json',
            params: parseSharedAuth.client,
          },
        ];

        const writeAuthFile = async (
          outFilepath: string,
          params:
            | Credentials
            | {
                client_id: string;
                client_secret: string;
                redirect_uris: string[];
              },
        ) => {
          fs.writeFile(outFilepath, JSON.stringify(params), (error) => {
            if (error) throw error;
          });
        };

        for (let file = 0; file < copyFiles.length; file++) {
          const authDitPath = 'src/auth';
          const fileToCopy = copyFiles[file];

          const outFilepath = `${authDitPath}/${fileToCopy.copyFilename}`;
          const exists = fs.existsSync(outFilepath);

          if (!exists) {
            await writeAuthFile(outFilepath, fileToCopy.params);
          } else {
            fs.rm(outFilepath, async (error) => {
              if (error) throw error;
              await writeAuthFile(outFilepath, fileToCopy.params);
            });
          }
        }
      }
    }
  }

  async apply() {
    let credentials: Credentials;
    let oAuth2Client: OAuth2Client;

    fs.readdir('src/auth', (error, files) => {
      if (error) throw error;
      if (files) {
        const clientSecretsFile = files.find(
          (file) => file === 'client_secret.json',
        );

        const accessTokenFile = files.find(
          (file) => file === 'access_token.json',
        );

        if (accessTokenFile) {
          fs.readFile(`src/auth/${accessTokenFile}`, (error, data) => {
            if (error) throw error;

            const stringifyData = data.toString('utf8');
            credentials = JSON.parse(stringifyData);
          });
        }

        if (clientSecretsFile) {
          fs.readFile(`src/auth/${clientSecretsFile}`, (error, data) => {
            if (error) throw error;

            const stringifyData = data.toString('utf8');
            const clientSecrets = JSON.parse(stringifyData);

            oAuth2Client = new google.auth.OAuth2(
              clientSecrets.client_id,
              clientSecrets.client_secret,
              clientSecrets.redirect_uris,
            );
          });
        }
      }
    });

    return { credentials, oAuth2Client };
  }
}
