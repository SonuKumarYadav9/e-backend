import otpModel from "../../models/otp/otp.js";

 const verifyOTP = async (req, res) => {
  try {
    const { userID, otp } = req.body;

    // Find the OTP data for the given user ID
    const otpData = await otpModel.findOne({ userId: userID });

    if (!otpData) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // Check if the OTP matches
    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }


    // await otpData.delete();     //  this will effect if user will refres after matching that otp 

    return res.status(200).json({ status: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};


export default verifyOTP