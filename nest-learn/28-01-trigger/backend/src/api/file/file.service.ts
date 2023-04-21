import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const storage = new Storage({
      projectId: 'backend-camp',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-test');

    //구글 스토리지에 파일 업로드 하기
    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`codecamp-test/${el.filename}`))
            .on('error', () => reject('실패함'));
        });
      }),
    );

    //url 리턴
    return results;
  }
}
