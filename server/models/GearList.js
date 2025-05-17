// server/models/GearList.js
import mongoose from 'mongoose';

const gearListSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:    { type: String, required: true },
  favorite: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('GearList', gearListSchema);
