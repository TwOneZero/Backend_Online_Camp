import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  name: String,
  email: String,
  pwd: String,
  personal: String,
  prefer: String,
  phone: String,
  og: Object
})

export const User = mongoose.model('User', UserSchema);
