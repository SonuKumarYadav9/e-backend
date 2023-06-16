const mongoose = require("mongoose");

const retailerShortRecord = mongoose.Schema(
  {
    supportPhone: {
      type: String,
      message: "9117357082",
    },
    supportEmail: {
      type: String,
      default: "abcd@gmail.com",
    },
    retailerMob: {
      type: String,
      default: "No mobile number provided",
    },
    aepsBalance: {
      type: Number,
      default: 0,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    successTransaction: {
      type: Number,
      default: 0,
    },
    failedTransaction: {
      type: Number,
      default: 0,
    },
    todayEarning: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    totalMobileRecharges: {
      type: Number,
      default: 0,
    },
    totalAeps: {
      type: Number,
      default: 0,
    },
    totalDmt: {
      type: Number,
      default: 0,
    },
    totalPan: {
      type: Number,
      default: 0,
    },
    totalElectricity: {
      type: Number,
      default: 0,
    },
    totalLic: {
      type: Number,
      default: 0,
    },
    totalBBPS: {
      type: Number,
      default: 0,
    },
    totalMicroAtm: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("r-shortrecord", retailerShortRecord);
