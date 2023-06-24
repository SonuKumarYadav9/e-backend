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
    enum:['percent','flat']
  },
  API: {
    type: String,
    required: true
  },
  retailer: {
    type: Number,
    required: true
  }
});

export default mongoose.model('payout-commission', commissionSchema);



// its json File  for postman 

//*! first data to create For Payout

// {
//     "slab": {
//       "type": {
//         "name": 1,
//         "range": {
//           "min": 100,
//           "max": 1000
//         }
//       },
//       "required": true
//     },
//     "type": "flat",
//     "API": "your_api_value",
//     "retailer": 4.75
//   }
  