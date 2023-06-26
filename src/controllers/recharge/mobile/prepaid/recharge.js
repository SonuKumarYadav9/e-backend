import { rechargeAPi } from "../../../../helper/externalApi.js";
import userModel from "../../../../models/user/userModel.js";
import rechargeModel from "../../../../models/recharge/rechargeModel.js";
import rechargeCommissionRecord from "../../../../models/commissions/RechargeCommissionRecord/rechargeCommissionRecord.js";

const mobileRecharge = async (req, res) => {
  try {
    const { mobile, amount, id, operator } = req.body;

    if (!(mobile || amount || id || operator))
      return res.status(400).json("Please Provide All Parameters");

    let user = await userModel.findById(id);

    if (user) {
      var commission = 0;

      /*
      ! FINDING PARENT USER AND GIVING REWARD
      */

      var Get_Parent_User = await userModel.findById(user.parent_id);

      while (Get_Parent_User) {
        const Get_Parent_User_Role = Get_Parent_User.role;

        switch (Get_Parent_User_Role) {
          case "master":
            commission = 5;
            break;
          case "distributor":
            commission = 2;
            break;
          case "retailer":
            commission = 1;
            break;
        }

        await userModel.findByIdAndUpdate(
          { _id: Get_Parent_User._id },
          { $inc: { balance: commission } }
        );


// HERE BELOW YOU WILL SAVE DATABASE RECORD LIKE HOW MUCH WE HAVE GIVEN COMMISION TO WHOME AND WHAT WAS THE ROLE



const saveCommissionRecord = new rechargeCommissionRecord({
              userId:Get_Parent_User._id,
              name:Get_Parent_User.name,
              commission,
              role:Get_Parent_User.role
});

 const savedRecord = await saveCommissionRecord.save()


        Get_Parent_User = await userModel.findById(Get_Parent_User.parent_id);
      }

      // Save the recharge information to the database
      const recharge = new rechargeModel({
        mobile,
        operator,
        amount,
        commission,
        role: user.role,
        ownerId: id,
        createdAt: new Date(),
      });
      await recharge.save();
    } else {
      return res.status(404).send({ status: false, msg: "User Not Found" });
    }
    let data = { amount, mobile };

    return res
      .status(200)
      .json({ status: true, msg: " Recharge success", data: data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default mobileRecharge;
