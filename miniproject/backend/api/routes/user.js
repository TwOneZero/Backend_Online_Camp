import express from 'express';
import { User } from '../../schemas/User.js';
import { Token } from '../../schemas/Token.js';
import { ogScrap } from '../../utils.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from '../middlewares/email.js';
const router = express.Router();


//회원 가입
router.post('/', async (req, res, next) => {
  try {
    const { name, email, personal, prefer, pwd, phone } = req.body;
    console.log(name, email, personal, prefer, pwd, phone);
    //토큰에 핸드폰 and isAuth = true 확인
    const userAuth = await Token.findOne({ phone });
    //번호가 없거나 isAuth =false 인 경우 error
    if (!userAuth?.isAuth) {
      return res.status(422).json({ message: 'Error : 핸드폰 번호가 인증되지 않았습니다.' });
    }
    //isAuth :  true -> prefer 사이트의 og 태그를 같이 저장한다.
    const scrapDatas = await ogScrap(prefer);
    if (scrapDatas.error) {
      return res.status(500).json({ error: 'Scrap Error', message: '스크랩 에러 발생' })
    }
    console.log(scrapDatas.title, scrapDatas.image, scrapDatas.description);
    const per = res.data[0].personal.split('-');
    const newPer = per[0].concat('-', '*******');
    console.log(newPer);
    //DB 에 저장
    const user = new User({
      name,
      email,
      personal: newPer,
      prefer,
      pwd,
      phone,
      og: {
        'title': scrapDatas.title,
        'description': scrapDatas.description,
        'image': scrapDatas.image
      }
    })
    await user.save()
      .then(async (result) => {
        //user를 db에 저장하면서 가입 환영 email 보냄
        if (checkValidationEmail(email)) {
          const template = getWelcomeTemplate(name, email);
          await sendTemplateToEmail(email, template);
        }
        return res.status(200).json(result);
      }).catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: err, message: '회원 가입 오류' });
  }
})

//모든 회원 조회
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ message: '회원이 없습니다.' })
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error, message: '회원 조회 오류' })
  }
})



export default router;