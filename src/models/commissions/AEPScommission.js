import mongoose from "mongoose";

const slabSchema = new mongoose.Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const commissionSchema = new mongoose.Schema({
  slab: {
    type: {
      name: {
        type: String,
        required: true,
      },
      range: slabSchema,
    },
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

export default mongoose.model("aeps-commission", commissionSchema);
