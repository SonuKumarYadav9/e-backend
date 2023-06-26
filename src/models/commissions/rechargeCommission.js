import mongoose from "mongoose";

const rechargeCommissionSchema = new mongoose.Schema({
  operatorName: {
    type: String,
    required:true
  },
  type: {
    type: String,
    enum: ["percent", "flat"],
    required:true
  },
  apiClient: {
    type: Number,
    default: 1,
    required:true
  },
  master: {
    type: Number,
    default: 1,
    required:true
  },
  distributer: {
    type: Number,
    default: 1,
    required:true
  },
  retailer: {
    type: Number,
    default: 1,
    required:true
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


