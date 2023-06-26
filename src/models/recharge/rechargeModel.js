// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const rechargeSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  commission:{
    type:Number,
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  role:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default: Date.now,   //  commison ,ownerId , operator,
  },
});

export default mongoose.model('recharge', rechargeSchema);
