import puppeteer from 'puppeteer';
import { Stock } from './schemas/Stock.js';
import mongoose from 'mongoose';

//도커로 실행된 몽고디비 연결
mongoose.connect("mongodb://localhost:27017/mydocker")

const startCrawling = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://finance.naver.com/item/sise.naver?code=005930');

  const framePage = page.frames().find(frame => frame.url().includes('/item/sise_day.naver?code=005930'))

  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );
    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    )

    console.log(`날짜 : ${date}\n가격 : ${price}`);

    try {
      const stock = new Stock({
        name: '삼성전자',
        date: date,
        price: Number(price.replace(',', ''))
      })
      await stock.save();
    } catch (error) {
      console.log(error);
    }

  }

  await browser.close();
}

startCrawling()
