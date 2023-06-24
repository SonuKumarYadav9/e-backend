import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema({
  slab: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
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

export default mongoose.model('dmt-commission', commissionSchema);


// it's jason file
// {
//   "slab": {
//     "min": 100,
//     "max": 500
//   },
//   "type": "percent",
//   "APIClient": 0.5,
//   "master": 0.3,
//   "distributor": 0.2,
//   "retailer": 0.1
// }