
import adminShortRecord from '../../../models/shortRecord/shortRecordAdmin.js'
import userModel from '../../../models/user/userModel.js'


//Not tested YET 
const generateMonthlyReport = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const adminRecord = await adminShortRecord.findOneAndUpdate(
      
      {
        monthlyReport: {
          $not: {
            $elemMatch: { date: { $gte: firstDayOfMonth, $lt: nextMonth } }
          }
        }
      },
      {
        $push: {
          monthlyReport: {
            BBPS: 0,
            AEPS: 0,
            DMT: 0,
            recharge: 0,
            pan: 0,
            tickets: 0,
            date: currentDate
          }
        }
      },
      { new: true }
    );

    console.log(adminRecord)

    if (!adminRecord) {
      return res.status(400).json({ status: false, msg: "Monthly report already exists" });
    }

    return res.status(200).json({ status: true, msg: "Admin Monthly Record", data: adminRecord });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};




/// WORKING 

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
          successTransactions: { $sum: "$dmtReport.successTransaction" },
          pendingTransactions: { $sum: "$dmtReport.pendingTransaction" },
          failedTransactions: { $sum: "$dmtReport.failedTransaction" }
        }
      }
    ]);

    if (dailyReport.length === 0) {
      console.log("No daily report found");
      return;
    }

    console.log(dailyReport)

  


    return res.status(200).json({ status: true, msg: "Admin Daily Record", data: dailyReport});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};


export default { generateMonthlyReport, generateDailyReport };
