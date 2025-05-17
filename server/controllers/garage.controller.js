import GearItem from '../models/GearItem.js';

// Create a new gear item
export async function createGearItem(req, res, next) {
  try {
    const data = { ...req.body, user: req.user.id };
    const item = await GearItem.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// Get all gear items for the authenticated user
export async function getGearItems(req, res, next) {
  try {
    const items = await GearItem.find({ user: req.user.id }).sort('category name');
    res.json(items);
  } catch (err) {
    next(err);
  }
}

// Get a single gear item
export async function getGearItem(req, res, next) {
  try {
    const item = await GearItem.findOne({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ error: 'Gear item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// Update a gear item
export async function updateGearItem(req, res, next) {
  try {
    const item = await GearItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Gear item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// Delete a gear item
export async function deleteGearItem(req, res, next) {
  try {
    const item = await GearItem.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ error: 'Gear item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
}