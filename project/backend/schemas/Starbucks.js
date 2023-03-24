import mongoose, { Schema } from 'mongoose';


const StarbucsSchema = new Schema({
  name: String,
  img: String,
})

export const Starbucks = mongoose.model('Starbucks', StarbucsSchema);
