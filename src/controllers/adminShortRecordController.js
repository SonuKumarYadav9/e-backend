const adminShortRecord = require("../models/shortRecordAdmin");
const userModel = require("../models/userModel")






const generateMonthlyReport = async (req, res) => {
  try {
    const adminRecord = await adminShortRecord.findOne(); // Assuming you only have one document in the collection

    if (!adminRecord) {
    //   console.log("Admin record not found");
      return res.status(404).json({ status: false, msg: "Admin record not found" });
    }

    const currentDate = new Date();
    console.log(currentDate)

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    console.log(firstDayOfMonth)

    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    console.log(nextMonth)

    // Check if the monthly report for the current month already exists
    const existingReport = adminRecord.monthlyReport.find((report) => report.date >= firstDayOfMonth && report.date < nextMonth);

    if (existingReport) {
      console.log("Monthly report already exists");
      return res.status(400).json({ status: false, msg: "Monthly report already exists" });
    }

    const newReport = {
      BBPS: 0,
      AEPS: 0,
      DMT: 0,
      recharge: 0,
      pan: 0,
      tickets: 0,
      date: currentDate,
    };

    adminRecord.monthlyReport.push(newReport);
    const data = await adminRecord.save();

    return res.status(200).json({ status: true, msg: "Admin Monthly Record", data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

const generateDailyReport = async (req, res) => {
    try {
      const dailyReport = await userModel.aggregate([
        {
          $group: {
            _id: null,
            totalRequests: { $sum: "$fundRequest.totalRequest" },
            pendingRequests: { $sum: "$fundRequest.pendingRequest" },
            acceptedRequests: { $sum: "$fundRequest.acceptedRequest" },
            rejectedRequests: { $sum: "$fundRequest.rejectedRequest" },
            totalRecharge: { $sum: "$rechargeReport.totalRecharges" },
            pendingRecharge: { $sum: "$rechargeReport.pendingRecharges" },
            successRecharge: { $sum: "$rechargeReport.successRecharge" },
            failedRecharge: { $sum: "$rechargeReport.failedRecharge" },
            totalTickets: { $sum: "$supportTicket.totalTickets" },
            pendingTickets: { $sum: "$supportTicket.pendingTickets" },
            openTickets: { $sum: "$supportTicket.openTickets" },
            closedTickets: { $sum: "$supportTicket.closedTickets" },
            totalCouponsPurchased: { $sum: "$panReports.purchasedCoupan" },
            totalBuyAmount: { $sum: "$panReports.totalBuyAmount" },
            closingBalance: { $sum: "$panReports.closingBalance" },
            successCoupons: { $sum: "$panReports.successCoupan" },
            totalTransactions: { $sum: "$aepsReport.totalTransaction" },
            cashWithdrawal: { $sum: "$aepsReport.cashWithdrawal" },
            adharPay: { $sum: "$aepsReport.aadharPay" },
            pendingFailed: { $sum: "$aepsReport.pendingFailed" },
            totalTransactions: { $sum: "$dmtReport.totalTransaction" },
            successTransactions: { $sum: "$dmtReport.successTransaction" },
            pendingTransactions: { $sum: "$dmtReport.pendingTransaction" },
            failedTransactions: { $sum: "$dmtReport.failedTransaction" },
          },
        },
      ]);
  
      if (dailyReport.length === 0) {
        console.log("No daily report found");
        return;
      }
  
      const report = dailyReport[0]; // Assuming only one daily report is generated
  
      const dailyReportData = {
        fundRequests: {
          totalRequest: report.totalRequests,
          pendingRequest: report.pendingRequests,
          acceptedRequests: report.acceptedRequests,
          rejectedRequests: report.rejectedRequests,
        },
        rechargeReport: {
          totalRecharge: report.totalRecharge,
          pendingRecharge: report.pendingRecharge,
          successRecharge: report.successRecharge,
          failedRecharge: report.failedRecharge,
        },
        supportTickets: {
          totalTickets: report.totalTickets,
          pendingTickets: report.pendingTickets,
          openTickets: report.openTickets,
          closedTickets: report.closedTickets,
        },
        panReport: {
          totalCouponsPurchased: report.totalCouponsPurchased,
          totalBuyAmount: report.totalBuyAmount,
          closingBalance: report.closingBalance,
          successCoupons: report.successCoupons,
        },
        aepsReport: {
          totalTransactions: report.totalTransactions,
          cashWithdrawal: report.cashWithdrawal,
          adharPay: report.adharPay,
          pendingFailed: report.pendingFailed,
        },
        dmtReport: {
            totalTransactions: report.totalTransactions,
          successTransactions: report.successTransactions,
          pendingTransactions: report.pendingTransactions,
          failedTransactions: report.failedTransactions,
        },
      };


      return res.status(200).send({ status: true, msg: "Daily Report", data: dailyReportData });
    } catch (error) {
      console.log(error);
    }
  };


module.exports = { generateMonthlyReport  , generateDailyReport };
