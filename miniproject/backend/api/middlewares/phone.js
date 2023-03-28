import coolsms from 'coolsms-node-sdk';


export const checkValidationPhone = (pnum) => {
  if (pnum.length !== 10 && pnum.length !== 11) {
    console.log('error : 핸드폰 번호가 올바르지 않습니다.');
    return false;
  }
  return true;
}

export const getToken = () => {
  const result = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
  console.log('token : ' + result);
  return result;
}

export const sendTokenToSMS = async (pnum, token) => {

  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const mysms = coolsms.default; //SDK 가져오기

  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: pnum,
    from: SMS_SENDER,
    text: `[이일공] 안녕하세요! 요청하신 인증번호는 [${token}] 입니다.`
  })

  console.log(result);
}
