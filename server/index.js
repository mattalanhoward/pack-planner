// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import garageRoutes from './routes/garage.routes.js';
import listRoutes from './routes/list.routes.js';

// Load environment variables
dotenv.config({ path: './.env' });

const { MONGO_URI, PORT = 3000, API_PREFIX = '/api' } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('🔗 MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/garage`, garageRoutes);
app.use(`${API_PREFIX}/lists`, listRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}${API_PREFIX}`);
});
