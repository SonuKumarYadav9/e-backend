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
  slab:{
    type: slabSchema,
    required: true,
  },
  type: {
    type: String,
    required: true,
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

export default mongoose.model("dmt-commission", commissionSchema);


// it's jason file

// {
//   "ID": 1,
//   "slab": {
//     "min": 100,
//     "max": 1000
//   },
//   "type": "Flat",
//   "APIClient": 10,
//   "master": 10,
//   "distributor": 10,
//   "retailer": 10
// }