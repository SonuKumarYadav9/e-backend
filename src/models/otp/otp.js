// const mongoose = require("mongoose");
import mongoose from 'mongoose'


const otpSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }, {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin", 
  }],
  otp: {
    type: Number,
  },
});

export default mongoose.model("otp", otpSchema);
