import express from 'express';
import { Token } from '../../schemas/Token.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from '../middlewares/phone.js';

const router = express.Router();


//토큰 인증 요청
router.post('/phone', async (req, res, next) => {
  const { phone } = req.body;
  try {
    //번호가 올바른지 체크
    if (checkValidationPhone(phone)) {
      const token = getToken();
      //저장된 번호가 있는 지 확인 
      const isPhone = await Token.findOne({ phone });
      if (isPhone) {
        //기존 정보 삭제
        await Token.deleteOne({ phone: phone });
      }
      //토큰 정보 저장
      const tokenInfo = new Token({
        token,
        phone,
        isAuth: false
      })
      await tokenInfo.save();
      //문자 메시지 전송 
      await sendTokenToSMS(phone, token);
      return res.json({ message: '핸드폰으로 인증 문자가 전송되었습니다!' });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: '핸드폰 인증이 제대로 이루어지지 않았음!' });
  }
})

//토큰 인증 완료
router.patch('/phone', async (req, res, next) => {
  try {
    const { phone, token } = req.body;
    if (!phone) {
      return res.status(404).json({ error: false, message: '번호를 제대로 입력해주세요.' });
    }
    //토큰 정보 찾아보기
    const tokenInfo = await Token.findOne({ phone });
    //토큰 일치 하면 저장해주기
    if (tokenInfo?.token === token && tokenInfo?.isAuth === false) {
      await tokenInfo.updateOne({ isAuth: true }).then((result) => {
        console.log(result);
      })
      return res.status(200).json({ message: '토큰 인증 완료!' });
    }
    return res.status(400).json({ isAuth: false, message: '토큰 인증 실패!' });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: '토큰 인증 에러', message: '번호를 제대로 입력해주세요.' });
  }
})



export default router;