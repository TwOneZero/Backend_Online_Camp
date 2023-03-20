import express from 'express'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { Board } from './schemas/Board.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));



//게시글 불러오기
app.get('/boards', async (req, res) => {
  const allBoards = await Board.find();
  console.log(allBoards);

  return res.status(200).json(allBoards);
})


//게시글 저장
app.post('/boards', async (req, res) => {
  const { writer, title, contents } = req.body;
  const newBoard = new Board({
    writer,
    title,
    contents
  })
  await newBoard.save();

  return res.status(200).json(newBoard);
})

//sms 전송
app.post('/tokens/phone', (req, res) => {
  const myphone = req.body.pnum

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone)
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken()

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken)
    res.send("인증완료!!!")
  }
})

//이메일 전송
app.post('/users', (req, res) => {
  const user = req.body.user

  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email)
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate(user)

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate)
    res.send("가입완료!!!")
  }
})

// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/mydocker")

// Backend API 서버 오픈
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})