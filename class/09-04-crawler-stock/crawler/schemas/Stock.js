import mongoose, { Schema } from 'mongoose';


const StockSchema = new Schema({
  name: String,
  price: Number,
  date: Date,
})

export const Stock = mongoose.model('Stock', StockSchema);