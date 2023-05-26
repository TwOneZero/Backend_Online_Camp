import express from 'express';

const app = express();


// 주식 가격 조회
app.get('/stocks', function (req, res) {
  res.send('주식 가격 조회')
})
// 주식 최대 가격 조회
app.get('/stocks/max', function (req, res) {
  res.send('주식 최대 가격 조회')
})
// 신규주식 등록
app.post('/stocks', function (req, res) {
  console.log(req.body);
  res.send('신규 주식 가격 등록')

})

app.listen(3002);