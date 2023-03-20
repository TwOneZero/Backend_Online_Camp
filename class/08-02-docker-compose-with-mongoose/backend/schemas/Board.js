import mongoose from 'mongoose';
const { Schema } = mongoose;

const boardSchema = new Schema({
  writer: String,
  title: String,
  contents: String
});

export const Board = mongoose.model('Board', boardSchema);