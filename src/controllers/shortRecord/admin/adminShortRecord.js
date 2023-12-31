
import adminShortRecord from '../../../models/shortRecord/shortRecordAdmin.js'
import userModel from '../../../models/user/userModel.js'


//Not tested YET 
export const generateMonthlyReport = async (req, res) => {
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

    // console.log(adminRecord)

    if (!adminRecord) {
      return res.status(400).json({ status: false, msg: "Monthly report already exists" });
    }

    return res.status(200).json({ status: true, msg: "Admin Monthly Record", data: adminRecord });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};


/// WORKING 
export const generateDailyReport = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;


    console.log("fromDate => "+fromDate)
    console.log("toDate => "+toDate)

    const timestamp = fromDate;
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day }`;

    const timestamp2 = toDate;
    const date2 = new Date(timestamp2);

    const year2 = date2.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth() + 1;

    const formattedDate2 = `${year2}-${month2 < 10 ? "0" + month2 : month2}-${day2 < 10 ? "0" + day2 : day2 }`;

    const startDate = new Date(formattedDate);
    const endDate = new Date(formattedDate2);

    endDate.setDate(endDate.getDate() + 1);


    const dailyReport = await userModel.aggregate([
      // Filter the data based on the transaction timestamp within the last 24 hours
      {
        $match: {
          createdAt: {
            $gte: (startDate).toISOString(),
            $lt: (endDate).toISOString(),
          },
        }
      },
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

    // if (dailyReport.length === 0) {
    //   // If there are no transactions within the last 24 hours, return a response with all fields as 0
    //   return res.status(200).json({
    //     status: true,
    //     msg: "Admin Daily Record",
    //     data: {
    //       _id: null,
    //       totalRequests: 0,
    //       pendingRequests: 0,
    //       acceptedRequests: 0,
    //       rejectedRequests: 0,
    //       totalRecharge: 0,
    //       pendingRecharge: 0,
    //       successRecharge: 0,
    //       failedRecharge: 0,
    //       totalTickets: 0,
    //       pendingTickets: 0,
    //       openTickets: 0,
    //       closedTickets: 0,
    //       totalCouponsPurchased: 0,
    //       totalBuyAmount: 0,
    //       closingBalance: 0,
    //       successCoupons: 0,
    //       totalTransactions: 0,
    //       cashWithdrawal: 0,
    //       adharPay: 0,
    //       pendingFailed: 0,
    //       successTransactions: 0,
    //       pendingTransactions: 0,
    //       failedTransactions: 0
    //     }
    //   });
    // }

    // Return the daily report if transactions occurred within the last 24 hours
    return res.status(200).json({ status: true, msg: "Admin Daily Record", data: dailyReport });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};
