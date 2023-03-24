import mongoose, { Schema } from 'mongoose';


const TokenSchema = new Schema({
  token: String,
  phone: String,
  isAuth: Boolean
})

export const Token = mongoose.model('Token', TokenSchema);
