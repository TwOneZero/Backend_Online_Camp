import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/file-upload.interface';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

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

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise<string>((res, rej) => {
          el.createReadStream().pipe(
            storage
              .file(el.filename)
              .createWriteStream()
              .on('finish', () => res(`${bucket}/${el.filename}`))
              .on('error', () => rej('파일 저장 실패')),
          );
        });
      }),
    );

    return results;
  }
}
