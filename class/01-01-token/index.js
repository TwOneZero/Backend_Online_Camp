console.log('안녕하세요');

const getToken = (tokenLength) => {
  //undefined -> 값이 알려지지 않거나, 없음 ( 모름 )
  //null -> 강제로 비웠을 때
  if (tokenLength === undefined) {
    console.log('error : tokenLength is undefined');
    return;
  } else if (tokenLength <= 0) {
    console.log('error : tokenLength is too short');
    return
  } else if (tokenLength >= 10) {
    console.log('error : tokenLength is too long');
    return
  }
  const result = String(Math.floor(Math.random() * 10 ** tokenLength)).padStart(tokenLength, '0');
  console.log(result);
};

getToken();
