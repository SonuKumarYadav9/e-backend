import otpModel from "../../models/otp/otp.js"; 

const checkOTP = async (req, res) => {
    try {
      const { userID, otp, token, name: encodedName } = req.query;
  
      //*! Find the OTP data in the database for the given user ID
      const otpData = await otpModel.findOne({ userId: userID });
  
      console.log(otpData);
      if (!otpData) {
        return res.status(404).json({ message: "OTP not found" });
      }
  
      //*! Convert the otp value to a number using parseInt()
      const enteredOTP = parseInt(otp, 10);
  
      //*! Check if the provided OTP matches the stored OTP
      if (enteredOTP === otpData.otp) {
        //*! Remove the OTP data from the database
        await otpData.deleteOne();
  
        const decodedName = decodeURIComponent(encodedName); //*! Use decodeURIComponent to decode the URL-encoded name
  
        return res.status(200).json({
          message: "Login Success",
          token: token,
          userID: userID,
          name: decodedName,
        });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };


  export default { checkOTP }