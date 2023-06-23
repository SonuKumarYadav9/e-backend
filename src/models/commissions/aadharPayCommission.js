import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true,
    enum:["percent","flat"]
  },
  retailer: {
    type: Number,
    required: true
  }
});

export default mongoose.model('aadhaar-pay-commission', commissionSchema);

