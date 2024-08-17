import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user-routes.js';
import './db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
const PORT = process.env.VITE_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
