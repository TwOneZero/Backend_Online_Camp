import axios from 'axios';
import { load } from 'cheerio';


const scrapFunc = async (data) => {
  //1. 입력된 데이터에서 http로 시작하는 주소 찾기
  const url = data.contents
    .split(' ')
    .filter((el) => el.includes('http'))[0];
  //2. 찾은 주소로 axios.get 요청
  const result = await axios.get(url);
  // 3. 스크랩핑 결과에서 og 코드 골라서 변수 저장
  const $ = load(result.data);
  $('meta').each((idx, el) => {
    //propety 가 있다면
    if ($(el).attr('property')) {
      //ex > og:title -> title
      const key = $(el).attr('property').split(':')[1];
      //ex > 네이버
      const content = $(el).attr('content')
      console.log(key, ' : ', content);
    }
  })
}

const frontData = {
  title: 'HI',
  contents: '주소는 https://daum.net 입니다.'
}

scrapFunc(frontData);