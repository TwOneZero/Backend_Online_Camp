import axios from 'axios';
import { load } from 'cheerio';

//날짜 포맷팅
export const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}-${mm}-${dd}`;
}

//사이트 오픈그래프 스크랩
export const ogScrap = async (link) => {
  //1. 입력된 데이터에서 http로 시작하는 주소 찾기
  const url = link
    .split(' ')
    .filter((el) => el.includes('http'))[0];
  //2. 찾은 주소로 axios.get 요청
  try {
    const result = await axios.get(url);
    // 3. 스크랩핑 결과에서 og 코드 골라서 변수 저장
    const $ = load(result.data);
    //빈 객체 생성
    const returnObj = {}
    $('meta').each((idx, el) => {
      //propety 가 있다면
      if ($(el).attr('property')) {
        //ex > og:title -> title
        const key = $(el).attr('property').split(':')[1];
        //ex > 네이버
        const content = $(el).attr('content')
        console.log(key, ' : ', content);
        //리턴할 객체에 저장
        returnObj[`${key}`] = content;
      }
    })
    return returnObj;
  } catch (error) {
    console.log('ogScrap Error!\n', error);
    return { error }
  }
}

