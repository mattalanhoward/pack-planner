// server/routes/list.routes.js
import { Router } from 'express';
import {
  createGearList,
  getGearLists,
  getGearList,
  updateGearList,
  deleteGearList,
  toggleFavoriteList,
  addCategory,
  updateCategory,
  deleteCategory,
  addListItem,
  updateListItem,
  deleteListItem
} from '../controllers/list.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();
router.use(authenticateToken);

// Gear Lists CRUD
router.post('/', createGearList);
router.get('/', getGearLists);
router.get('/:listId', getGearList);
router.patch('/:listId', updateGearList);
router.delete('/:listId', deleteGearList);
router.patch('/:listId/favorite', toggleFavoriteList);

// Categories CRUD
router.post('/:listId/categories', addCategory);
router.patch('/:listId/categories/:categoryId', updateCategory);
router.delete('/:listId/categories/:categoryId', deleteCategory);

// ListItems CRUD
router.post('/:listId/items', addListItem);
router.patch('/:listId/items/:itemId', updateListItem);
router.delete('/:listId/items/:itemId', deleteListItem);

export default router;
