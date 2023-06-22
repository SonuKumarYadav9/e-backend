// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const rechargeSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
  },
//   operator: {
//     type: String,
//     enum: ['Airtel', 'BSNL', 'BSNL STV', 'Idea', 'Jio', 'Vodafone', 'VI'],
//     required: true,
//   },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('recharge', rechargeSchema);
