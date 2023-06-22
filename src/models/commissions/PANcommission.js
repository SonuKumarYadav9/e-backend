import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema({
  slab: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["percent", "flat"],
  },
  APIClient: {
    type: Number,
    required: true,
  },
  master: {
    type: Number,
    required: true,
  },
  distributor: {
    type: Number,
    required: true,
  },
  retailer: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("pancard-commission", commissionSchema);
