// const mongoose = require("mongoose");
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["master", "distributor", "retailer"],
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    aadhar: {
      type: Number,
      required: true,
      unique: true,
    },
    account: {
      type: Number,
      required: true,
      unique: true,
    },
    bank: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
      unique: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    shopeName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },



    fundRequest: {
      totalRequest: {
        type: Number,
        default: 0,
      },
      pendingRequest: {
        type: Number,
        default: 0,
      },
      acceptedRequest: {
        type: Number,
        default: 0,
      },
      rejectedRequest: {
        type: Number,
        default: 0,
      },
    },

  
    rechargeReport: {
      totalRecharges: {
        type: Number,
        default: 0,
      },
      pendingRecharges: {
        type: Number,
        default: 0,
      },
      successRecharge: {
        type: Number,
        default: 0,
      },
      failedRecharge: {
        type: Number,
        default: 0,
      },
    },


    supportTicket: {
      totalTickets: {
        type: Number,
        default: 0,
      },
      pendingTickets: {
        type: Number,
        default: 0,
      },
      openTickets: {
        type: Number,
        default: 0,
      },
      closedTickets: {
        type: Number,
        default: 0,
      },
    },


    panReports: {
      purchasedCoupan: {
        type: Number,
        default: 0,
      },
      totalBuyAmount: {
        type: Number,
        default: 0,
      },
      closingBalance: {
        type: Number,
        default: 0,
      },
      successCoupan: {
        type: Number,
        default: 0,
      },
    },


    aepsReport: {
      totalTransaction: {
        type: Number,
        default: 0,
      },
      cashWithdrawal: {
        type: Number,
        default: 0,
      },
      aadharPay: {
        type: Number,
        default: 0,
      },
      pendingFailed: {
        type: Number,
        default: 0,
      },
    },


    dmtReport: {
      successTransaction: {
        type: Number,
        default: 0,
      },
      pendingTransaction: {
        type: Number,
        default: 0,
      },
      failedTransaction: {
        type: Number,
        default: 0,
      },
    },
    createdAt:{
      type:Date
    },
    updatedAt:{
      type:Date
    },

  },
  // { timestamps: true }
);

export default mongoose.model("user", userSchema);
