const mongoose = require("mongoose");

const adminShortRecord = new mongoose.Schema({

  // Headers

 header:[
   {
    aepsBalance: {
        type: Number,
        default: 0,
      },
      virtualBalance: {
        type: Number,
        default: 0,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
      },
   }
 ],

 
  // Members
  members: [
    {
      retailers: {
        count: {
          type: Number,
          default: 0,
        },
        totalAmount: {
          type: Number,
          default: 0,
        },
      },
      distributers: {
        count: {
          type: Number,
          default: 0,
        },
        totalAmount: {
          type: Number,
          default: 0,
        },
      },
      masters: {
        count: {
          type: Number,
          default: 0,
        },
        totalAmount: {
          type: Number,
          default: 0,
        },
      },
      apiClients: {
        count: {
          type: Number,
          default: 0,
        },
        totalAmount: {
          type: Number,
          default: 0,
        },
      },
      totalBalance: {
        type: Number,
        default: 0,
      },
    },
  ],

  // Monthly Report
  monthlyReport: [
    {
      BBPS: {
        type: Number,
        default: 0,
      },
      AEPS: {
        type: Number,
        default: 0,
      },
      DMT: {
        type: Number,
        default: 0,
      },
      recharge: {
        type: Number,
        default: 0,
      },
      pan: {
        type: Number,
        default: 0,
      },
      tickets: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // API Balance
  apiBalance: [
    {
      rechargeBalance: {
        type: Number,
        default: 0,
      },
      ekoBalance: {
        type: Number,
        default: 0,
      },
      totalBalance: {
        type: Number,
        default: 0,
      },
    },
  ],

  dailyReport: [
    {
      fundRequest: {
        totalRequest: {
          type: Number,
          default: 0,
        },
        pendingRequest: {
          type: Number,
          default: 0,
        },

        //STATUS

        acceptedRequest: {
          type: Number,
          default: 0,
        },
        rejectedRequest: {
          type: Number,
          default: 0,
        },
        pendingRequest: {
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

        //STATUS

        successRecharge: {
          type: Number,
          default: 0,
        },
        failedRecharge: {
          type: Number,
          default: 0,
        },
        pendingRecharge: {
          type: Number,
          default: 0,
        },
      },

      supportTicket: {
        totalTickets: {
          type: Number,
          default: 0,
        },
        openTickets: {
          type: Number,
          default: 0,
        },

        //STATUS

        openTickets: {
          type: Number,
          default: 0,
        },
        closedTickets: {
          type: Number,
          default: 0,
        },
        totalTickets: {
          type: Number,
          default: 0,
        },
      },

      panReports: {
        purchasedCoupan: {
          type: Number,
          default: 0,
        },

        //STATUS

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

        //STATUS

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
        totalTransaction: {
          type: Number,
          default: 0,
        },

        //STATUS

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
    },
  ],
});

module.exports = mongoose.model("admin-shortrecord", adminShortRecord);
