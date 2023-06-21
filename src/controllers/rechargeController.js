const {
  offerCheckUrl,
  operatorFetchApi,
  rechargeAPi,
} = require("../helper/externalApi");
const axios = require("axios");
const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const rechargeModel = require("../models/rechargeModel");
const geoip = require("geoip-lite");

const operatorFetch = (req, res) => {
  const { mobile } = req.body; // taking mobile no from query

  axios
    .get(`${operatorFetchApi}=${mobile}`)
    .then((response) => {
      const responseData = response.data;

      if (responseData.ERROR === "0" && responseData.STATUS === "1") {
        const operatorData = {
          mobile: responseData.Mobile,
          operator: responseData.Operator,
          opCode: responseData.OpCode,
          circle: responseData.Circle,
          circleCode: responseData.CircleCode,
        };
        return res.status(200).send({ status: true, data: operatorData });
      } else {
        return res.status(404).send({
          status: false,
          msg: "Operator not fetched or Something Error",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    });
};

const offerCheck = (req, res) => {
  try {
    const { mobile, operator } = req.body;
    let apiUrl = "";

    switch (operator) {
      case "Airtel":
        apiUrl = `${offerCheckUrl}operator_code=2&mobile_no=${mobile}`;
        break;
      case "Vodafone":
        apiUrl = `${offerCheckUrl}operator_code=23&mobile_no=${mobile}`;
        break;
      case "Idea":
        apiUrl = `${offerCheckUrl}operator_code=6&mobile_no=${mobile}`;
        break;
      case "Jio":
        apiUrl = `${offerCheckUrl}operator_code=11&mobile_no=${mobile}`;
        break;
      case "BSNL":
        apiUrl = `${offerCheckUrl}operator_code=5&mobile_no=${mobile}`;
        break;
      default:
        return res.status(400).send({ status: false, msg: "Invalid operator" });
    }

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        return res.status(200).send({ status: true, data: response.data });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ status: false, msg: error.message });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const mobileRecharge = async (req, res) => {
  try {
    const { mobile, amount } = req.body;

    const ip = "192.168.0.100";
    // or however you get the IP address

    const location = geoip.lookup(ip);

    if (location) {
      const latitude = location.ll[0];
      const longitude = location.ll[1];
      // do something with the latitude and longitude

      var GEOCode = `${latitude},${longitude}`;
      console.log(GEOCode);
    }

    const apiResponse = await axios.get(`${rechargeAPi}`, {
      params: {
        UserID: 435,
        Token: "2cd26db3da00a7e967fa3c3df7b94cdd",
        Account: 9117357082,
        Amount: amount,
        SPKey: "G117",
        ApiRequestID: 12345,
        GEOCode,
        CustomerNumber: mobile,
        Pincode: 221010,
        Format: 1,
      },
    });

    // Save the recharge information to the database
    const recharge = new rechargeModel({
      mobile,
      amount,
      createdAt: new Date(),
    });
    await recharge.save();

    // Process the commission for the user and its parent hierarchy
    const user = await userModel.findOne({ _id: req.params.id }).select({
      name: 1,
      email: 1,
      mobile: 1,
      balance: 1,
      role: 1,
      parent_id: 1,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Deduct the recharge amount from the user's balance
    const newBalance = (parseFloat(user.balance) - amount).toFixed(2);
    if (newBalance < 0) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    user.balance = newBalance;

    // Calculate the commission amount based on the recharge amount
    const commissionPercentage = 0.04; // Commission percentage (4%)
    const commissionAmount = amount * commissionPercentage;

    // Add the commission to the user's balance
    user.balance = (parseFloat(user.balance) + amount * 0.025).toFixed(2);
    await user.save();


    // Assign the commission to the parent hierarchy
// let parentUser = user;
// let parentCommissionPercentage = 0.005; // 0.5% for intermediate parents
// let remainingCommission = amount * 0.015; // 1.5% remaining commission after the retailer

// while (parentUser.parent_id) {
//   let parent;
//   if (parentUser.role === "distributor" || parentUser.role === "retailer") {
//     parent = await userModel.findOne({ _id: parentUser.parent_id });
//   } else if (parentUser.role === "master") {
//     parent = await adminModel.findOne({ _id: parentUser.parent_id });
//   }

//   if (!parent) {
//     break;
//   }

//   parentUser = parent;

//   // Calculate the commission percentage for the current parent
//   let currentCommissionPercentage = parentCommissionPercentage;

//   // Check if it's the last parent (retailer)
//   if (!parentUser.parent_id) {
//     currentCommissionPercentage = 1 - (2.5 / 100); // Remaining commission after giving 2.5% to the user
//   }

//   parentUser.balance = (
//     parseFloat(parentUser.balance) + remainingCommission * currentCommissionPercentage
//   ).toFixed(2);

//   await parentUser.save();

//   remainingCommission -= remainingCommission * parentCommissionPercentage;
// }

    // Return the response from the API to the client
   

  
    let parentUser = user;
    let parentCommissionPercentage = 0.005; // 0.5% for intermediate parents
    let remainingCommission = amount * 0.015; // 1.5% remaining commission after the retailer
    
    const parentHierarchy = []; // Store the parent hierarchy
    
    while (parentUser.parent_id) {
      let parent;
      if (parentUser.role === "distributor" || parentUser.role === "retailer") {
        parent = await userModel.findOne({ _id: parentUser.parent_id });
      } else if (parentUser.role === "master") {
        parent = await adminModel.findOne({ _id: parentUser.parent_id });
      }
    
      if (!parent) {
        break;
      }
    
      parentUser = parent;
    
      parentHierarchy.unshift(parentUser); // Add the parent to the beginning of the hierarchy array
    }
    
    const totalParents = parentHierarchy.length;
    console.log(totalParents);

    
    // Distribute the remaining commission among the parents
   if (totalParents === 1) {
  const currentParent = parentHierarchy[0];
  currentParent.balance = (
    parseFloat(currentParent.balance) + remainingCommission
  ).toFixed(2);
  await currentParent.save();
} else {
  const individualCommissionPercentage = 0.5 / totalParents;
  for (let i = 0; i < totalParents; i++) {
    const currentParent = parentHierarchy[i];
    const currentCommissionPercentage = i === totalParents - 1 ? remainingCommission / 100 : individualCommissionPercentage;
    const commissionAmount = remainingCommission * currentCommissionPercentage;

    currentParent.balance = (
      parseFloat(currentParent.balance) + commissionAmount
    ).toFixed(2);

    await currentParent.save();

    remainingCommission -= commissionAmount;
  }
}



    
   
    return res.status(200).json({
      apiResponse: apiResponse.data,
      commissionAmount,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { operatorFetch, offerCheck, mobileRecharge };
