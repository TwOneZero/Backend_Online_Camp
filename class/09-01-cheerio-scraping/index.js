import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();
app.use(cors());
app.use(express.json());




// Backend API 서버 오픈
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})