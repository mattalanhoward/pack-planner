// server/controllers/list.controller.js

import GearList from '../models/GearList.js';
import Category from '../models/Category.js';
import ListItem from '../models/ListItem.js';

// Create a new Gear List
export async function createGearList(req, res, next) {
  try {
    const list = await GearList.create({
      user: req.user.id,
      title: req.body.title
    });
    res.status(201).json(list);
  } catch (err) {
    next(err);
  }
}

// Get all Gear Lists for user
export async function getGearLists(req, res, next) {
  try {
    const lists = await GearList.find({ user: req.user.id }).sort('-createdAt');
    res.json(lists);
  } catch (err) {
    next(err);
  }
}

// Get single Gear List with categories and items
export async function getGearList(req, res, next) {
  try {
    const { listId } = req.params;
    const list = await GearList.findOne({ _id: listId, user: req.user.id });
    if (!list) return res.status(404).json({ error: 'Gear List not found' });

    const categories = await Category.find({ gearList: listId }).sort('order');
    const items = await ListItem.find({ gearList: listId })
      .populate('gearItem')
      .populate('category')
      .sort('createdAt');

    res.json({ list, categories, items });
  } catch (err) {
    next(err);
  }
}

// Update Gear List (rename)
export async function updateGearList(req, res, next) {
  try {
    const updated = await GearList.findOneAndUpdate(
      { _id: req.params.listId, user: req.user.id },
      { title: req.body.title },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Gear List not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete Gear List (and its categories & items)
export async function deleteGearList(req, res, next) {
  try {
    const deleted = await GearList.findOneAndDelete({ _id: req.params.listId, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Gear List not found' });

    // Cascade delete
    await Category.deleteMany({ gearList: req.params.listId });
    await ListItem.deleteMany({ gearList: req.params.listId });

    res.json({ message: 'Gear List deleted' });
  } catch (err) {
    next(err);
  }
}

// Toggle favorite on Gear List
export async function toggleFavoriteList(req, res, next) {
  try {
    const list = await GearList.findOne({ _id: req.params.listId, user: req.user.id });
    if (!list) return res.status(404).json({ error: 'Gear List not found' });

    list.favorite = !list.favorite;
    await list.save();

    res.json({ favorite: list.favorite });
  } catch (err) {
    next(err);
  }
}

// Add a Category
export async function addCategory(req, res, next) {
  try {
    const cat = await Category.create({
      name: req.body.name,
      order: req.body.order || 0,
      gearList: req.params.listId
    });
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
}

// Update Category (rename or reorder)
export async function updateCategory(req, res, next) {
  try {
    const updated = await Category.findOneAndUpdate(
      { _id: req.params.categoryId, gearList: req.params.listId },
      { name: req.body.name, order: req.body.order },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete Category (and its items)
export async function deleteCategory(req, res, next) {
  try {
    const deleted = await Category.findOneAndDelete({
      _id: req.params.categoryId,
      gearList: req.params.listId
    });
    if (!deleted) return res.status(404).json({ error: 'Category not found' });

    await ListItem.deleteMany({ category: req.params.categoryId });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}

// Add a ListItem (gear) to a Gear List under a Category
export async function addListItem(req, res, next) {
  try {
    const item = await ListItem.create({
      gearList: req.params.listId,
      gearItem: req.body.gearItem,
      category: req.body.category,
      quantity: req.body.quantity || 1
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

// Update ListItem (move category, change qty, toggle favorite)
export async function updateListItem(req, res, next) {
  try {
    const updated = await ListItem.findOneAndUpdate(
      { _id: req.params.itemId, gearList: req.params.listId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'ListItem not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// Delete ListItem
export async function deleteListItem(req, res, next) {
  try {
    const deleted = await ListItem.findOneAndDelete({
      _id: req.params.itemId,
      gearList: req.params.listId
    });
    if (!deleted) return res.status(404).json({ error: 'ListItem not found' });
    res.json({ message: 'ListItem deleted' });
  } catch (err) {
    next(err);
  }
}
