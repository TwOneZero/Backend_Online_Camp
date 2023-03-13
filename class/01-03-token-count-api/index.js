// 인증번호 요청 api 

/**
 * 절차
 * 1. 번호 body 입력받기
 * 2. 핸드폰 번호 검증 (10 ~ 11 자리)
 * 3. 토큰 생성
 * 4. 핸드폰으로 토큰 전송
 */

const createTokenOfPhone = (pnum, tokenLength = 6) => {

  if (pnum.length !== 10 && pnum.length !== 11) {
    console.log('error : 핸드폰 번호가 올바르지 않습니다.');
    return;
  }
  result = String(Math.floor(Math.random() * 10 ** tokenLength)).padStart(tokenLength, '0');
  console.log(pnum + '번호로 인증번호 ' + result + ' 를 전송합니다.');
};

createTokenOfPhone('01012345678');
