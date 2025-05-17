import { Router } from 'express';
import {
  createGearItem,
  getGearItems,
  getGearItem,
  updateGearItem,
  deleteGearItem
} from '../controllers/garage.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// All routes protected
router.use(authenticateToken);

router.post('/', createGearItem);
router.get('/', getGearItems);
router.get('/:id', getGearItem);
router.patch('/:id', updateGearItem);
router.delete('/:id', deleteGearItem);

export default router;