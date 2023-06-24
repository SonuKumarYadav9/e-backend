import adminModel from "../../models/admin/adminModel.js";
import bcrypt from 'bcrypt'
import otpModel from "../../models/otp/otp.js";
import  Jwt  from "jsonwebtoken";


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ email, role: "admin" });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in the database
    const otpData = new otpModel({
      userId: user._id,
      userType: user.role,
      otp: generatedOTP,
    });
    await otpData.save();

    // Generate JWT token
    const token = Jwt.sign(
      {
        userID: user._id.toString(),
        otp: generatedOTP,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    // Return success response with token
    return res.status(200).send({
      status: true,
      msg: "OTP Sent",
      token: token,
      userID:user._id
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

export default adminLogin;
