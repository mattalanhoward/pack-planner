// server/models/ListItem.js
import mongoose from 'mongoose';

const listItemSchema = new mongoose.Schema({
  gearList: { type: mongoose.Schema.Types.ObjectId, ref: 'GearList', required: true },
  gearItem: { type: mongoose.Schema.Types.ObjectId, ref: 'GearItem', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  quantity: { type: Number, default: 1 },
  favorite: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ListItem', listItemSchema);