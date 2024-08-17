// success-model.js
import mongoose from 'mongoose';

const successSchema = new mongoose.Schema({
  email: { type: String, required: true },
  saltedPassword: { type: String, required: true },
  message: { type: String, required: true }
});

const Success = mongoose.model('winners', successSchema);
export default Success;