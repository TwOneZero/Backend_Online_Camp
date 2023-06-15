/* eslint-disable @typescript-eslint/no-var-requires */
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');
/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateTumbnail = (event, context) => {
  //버킷 불러오기 -> 파일 읽기
  //1. 사이즈 축소
  //2. 재 업로드
  //-> 썸네일은 다른 버킷에

  const originStorage = new Storage().bucket('원본사진저장용버킷명');
  const thumbStorage = new Storage().bucket('썸네일사진저장용버킷명');

  const [prefix, postfix] = event.name.split('/origin/');

  //미디어 크기별로 저장
  const featByMediaArray = [
    {
      size: 320,
      name: `${prefix}/thumb/s/${postfix}`,
    },
    { size: 640, name: `${prefix}/thumb/m/${postfix}` },
    { size: 1280, name: `${prefix}/thumb/l/${postfix}` },
  ];

  featByMediaArray.forEach((el) => {
    originStorage
      .file(event.name)
      .createReadStream()
      .pipe(sharp().resize({ width: el.size }))
      .pipe(thumbStorage.file(`${el.name}`).createWriteStream())
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('error'));
  });
};
