import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import { Starbucks } from './Schemas/Starbucks.js'

//도커로 실행된 몽고디비 연결
mongoose.connect("mongodb://localhost:27017/starbucks")

const startCrawling = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  //스타벅스페이지
  await page.goto('https://www.starbucks.co.kr/menu/drink_list.do');

  try {
    //카테고리 길이는 10개
    for (let i = 0; i < 10; i++) {
      //각 카테고리 별 list 길이
      await page.$$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${(i + 1) * 2}) > ul > li`,
        (els) => els
      ).then(async (res) => {
        const coffesLen = res.length;
        //  카테고리의 담긴 커피 수 만큼 이미지와 이름 저장
        for (let j = 0; j < coffesLen; j++) {
          await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${(i + 1) * 2}) > ul > li:nth-child(${j + 1}) > dl > dt > a > img`,
            (el) => { return { image: el.src, name: String(el.alt) } }
          ).then(async (res) => {
            //커피 저장
            const starbucks = new Starbucks({
              img: res.image,
              name: res.name
            })
            await starbucks.save();
          })
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  await browser.close();
  //몽고 접속 정료
  await mongoose.disconnect().finally(() => {
    console.log('Done my job! mongo disconnected.');
  });
  return;
}

startCrawling()
