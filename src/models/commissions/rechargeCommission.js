import mongoose from "mongoose";

const rechargeCommissionSchema = new mongoose.Schema({
  operatorName: {
    type: String,
  },
  type: {
    type: String,
    enum: ["percent", "flat"],
  },
  apiClient: {
    type: Number,
    default: 1,
  },
  master: {
    type: Number,
    default: 1,
  },
  distributer: {
    type: Number,
    default: 1,
  },
  retailer: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("recharge-commission", rechargeCommissionSchema);



// json File

// {
//   "operatorName": "",
//   "type": "",
//   "apiClient": 1,
//   "master": 1,
//   "distributer": 1,
//   "retailer": 1
// }


