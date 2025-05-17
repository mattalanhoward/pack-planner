import mongoose from 'mongoose';

const gearItemSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:    { type: String, required: true },  // from predefined list
  itemType:    { type: String, required: true },
  brand:       { type: String, required: true },
  name:        { type: String, required: true },
  description: { type: String },
  weight:      { type: Number }, // grams
  price:       { type: Number }, // USD or configured currency
  link:        { type: String },
  worn:        { type: Boolean, default: false },
  consumable:  { type: Boolean, default: false },
  quantity:    { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model('GearItem', gearItemSchema);