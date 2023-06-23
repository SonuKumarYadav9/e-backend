import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema({
  slab: {
    name: {
      type: String,
      required: true,
    },
    range: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
  },
  type: {
    type: String,
    required: true,
    enum: ['percent', 'flat'],
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

export default mongoose.model('aeps-commission', commissionSchema);




// it's json file for postman

// {
//   "slab": {
//     "name": "A",
//     "range": {
//       "min": 501,
//       "max": 3000
//     }
//   },
//   "type": "Percent",
//   "APIClient": 0.30,
//   "master": 0.30,
//   "distributor": 0.30,
//   "retailer": 0.30
// }

