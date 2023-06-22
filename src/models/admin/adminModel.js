// const mongoose = require("mongoose");
import mongoose from 'mongoose'

const adminShema = new mongoose.Schema(
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
      password: {
        type: String,
        required: true,
      },
      
      role: {
        type: String,
        default: 'admin',
      },

      balance:{
        type:Number,
        default:0
      },
 

      // fundRequest: {
      //   totalRequest: {
      //     type: Number,
      //     default: 0,
      //   },
      //   pendingRequest: {
      //     type: Number,
      //     default: 0,
      //   },
      //   acceptedRequest: {
      //     type: Number,
      //     default: 0,
      //   },
      //   rejectedRequest: {
      //     type: Number,
      //     default: 0,
      //   },
      // },
      // rechargeReport: {
      //   totalRecharges: {
      //     type: Number,
      //     default: 0,
      //   },
      //   pendingRecharges: {
      //     type: Number,
      //     default: 0,
      //   },
      //   successRecharge: {
      //     type: Number,
      //     default: 0,
      //   },
      //   failedRecharge: {
      //     type: Number,
      //     default: 0,
      //   },
      // },
      // supportTicket: {
      //   totalTickets: {
      //     type: Number,
      //     default: 0,
      //   },
      //   pendingTickets: {
      //     type: Number,
      //     default: 0,
      //   },
      //   openTickets: {
      //     type: Number,
      //     default: 0,
      //   },
      //   closedTickets: {
      //     type: Number,
      //     default: 0,
      //   },
      // },
      // panReports: {
      //   purchasedCoupan: {
      //     type: Number,
      //     default: 0,
      //   },
      //   totalBuyAmount: {
      //     type: Number,
      //     default: 0,
      //   },
      //   closingBalance: {
      //     type: Number,
      //     default: 0,
      //   },
      //   successCoupan: {
      //     type: Number,
      //     default: 0,
      //   },
      // },
      // aepsReport: {
      //   totalTransaction: {
      //     type: Number,
      //     default: 0,
      //   },
      //   cashWithdrawal: {
      //     type: Number,
      //     default: 0,
      //   },
      //   aadharPay: {
      //     type: Number,
      //     default: 0,
      //   },
      //   pendingFailed: {
      //     type: Number,
      //     default: 0,
      //   },
      // },
      // dmtReport: {
      //   successTransaction: {
      //     type: Number,
      //     default: 0,
      //   },
      //   pendingTransaction: {
      //     type: Number,
      //     default: 0,
      //   },
      //   failedTransaction: {
      //     type: Number,
      //     default: 0,
      //   },
      // },



    },
  { timestamps: true }
);

export default mongoose.model("admin", adminShema);
