// server/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name:     { type: String, required: true },
  order:    { type: Number, default: 0 },
  gearList: { type: mongoose.Schema.Types.ObjectId, ref: 'GearList', required: true },
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);