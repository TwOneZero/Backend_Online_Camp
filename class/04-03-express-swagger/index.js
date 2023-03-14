import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './swaggerOptions.js';
import { checkValidationPhone, sendToSMS, getToken } from './phone.js';

const swaggerSpec = swaggerJsdoc(options);



const app = express()
const port = 3000


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.get('/boards', (req, res) => {
  //1. 데이터를 조회하는 로직 => DB 에서 꺼내오기
  const result = [
    { boardId: 1, writer: 'user_1', title: 'board_1' },
    { boardId: 2, writer: 'user_2', title: 'board_2' },
    { boardId: 3, writer: 'user_3', title: 'board_3' }
  ]
  //2. 꺼내온 데이터를 프론트로 응답 주기
  res.send(result);
})

app.post('/boards', (req, res) => {
  // 1. 데이터를 등록하는 로직
  console.log(req.body);
  // 2. 
})
app.post('/tokens/phone', (req, res) => {
  const tokenLength = 6;
  const { pnum } = req.body;
  if (checkValidationPhone(pnum)) {
    sendToSMS(pnum, getToken(tokenLength));
  }
  res.send('인증완료');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})