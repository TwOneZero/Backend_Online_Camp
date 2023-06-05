import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/file-upload.interface';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { getDate } from 'src/commons/libraries/util';
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

@Injectable()
export class FileService {
  constructor(private readonly config: ConfigService) {}

  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    //스토리지 셋팅하기
    const bucket = this.config.get<string>('BUCKET_NAME');
    const storage = new Storage({
      projectId: this.config.get<string>('PROJECT_ID'),
      keyFilename: this.config.get<string>('KEY_FILE_NAME'),
    }).bucket(bucket);

    const getDateString: string = getDate();

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            const filename = `${getDateString}/${uuidv4()}origin/${
              el.filename
            }`;

            el.createReadStream()
              .pipe(storage.file(filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }
}
