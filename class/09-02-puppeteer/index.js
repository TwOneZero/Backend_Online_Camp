import puppeteer from 'puppeteer';


const startCrawling = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto('https://www.goodchoice.kr/product/home/1');

  const stage = await page.$eval(
    '#poduct_list_area > ul > li:nth-child(1) > a > div > div.name > strong',
    (el) => (el.textContent)
  );
  const location = await page.$eval(
    '#poduct_list_area > ul > li:nth-child(1) > a > div > div.name > p:nth-child(3)',
    (el) => (el.textContent)
  )

  const price = await page.$eval(
    '#poduct_list_area > ul > li:nth-child(1) > a > div > div.price > p:nth-child(2) > b',
    (el) => (el.textContent)
  )
  console.log(stage);
  console.log(location.trim());
  console.log(price);
  return;
}

startCrawling()
