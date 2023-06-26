import { rechargeAPi } from "../../../../helper/externalApi.js";
import userModel from "../../../../models/user/userModel.js";
import rechargeModel from "../../../../models/recharge/rechargeModel.js";

const mobileRecharge = async (req, res) => {
  try {
    const { mobile, amount, id, operator } = req.body;

    // const ip = "192.168.0.100";
    // const location = geoip.lookup(ip);
    // if (location) {
    //   const [latitude, longitude] = location.ll;
    //   var GEOCode = `${latitude},${longitude}`;
    //   console.log(GEOCode);
    // }

    let user = await userModel.findById(id);
    // console.log(user);

    if (user) {
      let commission = 5;

      // const apiResponse = await axios.get(`${rechargeAPi}`, {
      //   params: {
      //     UserID: 435,
      //     Token: "2cd26db3da00a7e967fa3c3df7b94cdd",
      //     Account: 9117357082,
      //     Amount: amount,
      //     SPKey: "G117",
      //     ApiRequestID: 12345,
      //     GEOCode,
      //     CustomerNumber: mobile,
      //     Pincode: 221010,
      //     Format: 1,
      //   },
      // });

      // Save the recharge information to the database
      const recharge = new rechargeModel({
        mobile,
        operator,
        amount,
        commission,
        role:user.role,
        ownerId: id,
        createdAt: new Date(),
      });
      await recharge.save();

     

    } else {
      return res.status(404).send({ status: false, msg: "User Not Found" });
    }
    let data= {amount,mobile}

    return res.status(200).json({status:true,msg:" Recharge success",data:data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default mobileRecharge;
