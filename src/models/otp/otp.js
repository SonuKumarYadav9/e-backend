
import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType',
  },
  userType: {
    type: String,
    required: true,
    enum: ['master','distributer','retailer', 'admin'],
  }, 
  otp: {
    type: Number,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1m' }, // Expire after 1 minute
  },
});


export default mongoose.model("otp", otpSchema);
