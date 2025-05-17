// server/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    // Create the new user
    const user = await User.create({ email, password });

    // Make sure JWT_SECRET is set
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Sign a token for the newly created user
    const accessToken = jwt.sign(
      { sub: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return the token and basic user info
    res.status(201).json({
      accessToken,
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Find user and verify password
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Make sure JWT_SECRET is set
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Sign a token
    const accessToken = jwt.sign(
      { sub: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return the token (and optionally user info)
    res.json({ accessToken, user: { _id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    // TODO: implement sending reset link via email
    res.json({ message: 'Password reset flow not implemented yet' });
  } catch (err) {
    next(err);
  }
}
