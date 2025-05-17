// server/routes/auth.routes.js
import { Router } from 'express';
import { register, login, resetPassword } from '../controllers/auth.controller.js';

const router = Router();

// Register new user
router.post('/register', register);

// Login (email/password)
router.post('/login', login);

// Password reset (send email)
router.post('/reset-password', resetPassword);

export default router;
