import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRouter from './api/routes/user.js';
import tokenRouter from './api/routes/token.js';
import 'dotenv/config';
import starbucksRouter from './api/routes/startbucks.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Hello express!');
})


app.use('/user', userRouter);
app.use('/token', tokenRouter);
app.use('/', starbucksRouter);


await mongoose.connect('mongodb://my-database:27017/starbucks').then(() => {
  console.log('MongoDB connected!');
})

app.listen(3000, () => {
  console.log('App listening on port 3000');
})