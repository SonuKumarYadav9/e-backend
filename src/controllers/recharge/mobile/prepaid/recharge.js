import { rechargeAPi } from "../../../../helper/externalApi.js";


 const mobileRecharge = async (req, res) => {
    try {
      const { mobile, amount } = req.body;
  
      const ip = "192.168.0.100";
      // or however you get the IP address
  
      const location = geoip.lookup(ip);
  
      if (location) {
        const [latitude, longitude] = location.ll;
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
      const user = await userModel
        .findOne({ _id: req.params.id })
        .select({
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
  
      // Deduct the recharge amount from the use
  
      // Return the response from the API to the client
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
  

  export default mobileRecharge
  
  

  