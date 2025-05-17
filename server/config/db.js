// server/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { MONGO_URI } = process.env;

export function connectDB() {
  return mongoose.connect(MONGO_URI);
}