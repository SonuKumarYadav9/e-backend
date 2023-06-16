const mongoose = require("mongoose");

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

module.exports = mongoose.model("otp", otpSchema);
