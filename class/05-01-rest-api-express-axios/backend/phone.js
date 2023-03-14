export const checkValidationPhone = (pnum) => {
  if (pnum.length !== 10 && pnum.length !== 11) {
    console.log('error : 핸드폰 번호가 올바르지 않습니다.');
    return false;
  }
  return true;
}

export const getToken = (tokenLength) => {
  if (tokenLength === undefined) {
    console.log('error : tokenLength is undefined');
    return;
  } else if (tokenLength <= 0) {
    console.log('error : tokenLength is too short');
    return;
  } else if (tokenLength >= 10) {
    console.log('error : tokenLength is too long');
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** tokenLength)).padStart(tokenLength, '0');
  console.log('token : ' + result);
  return result;
}

export const sendToSMS = (pnum, token) => {
  console.log(pnum + '번호로 인증번호 ' + token + '을 전송합니다.');
}
