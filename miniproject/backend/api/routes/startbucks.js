
import express from 'express';
import { Starbucks } from '../../schemas/Starbucks.js';

const router = express.Router();


//저장된 스타벅스 리스트 반환 
router.get('/starbucks', async (req, res, next) => {
  try {
    const coffeList = await Starbucks.find();
    return res.json(coffeList);
  } catch (error) {
    console.log(error);
  }
})



export default router;