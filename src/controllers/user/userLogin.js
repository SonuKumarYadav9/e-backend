import userModel from "../../models/user/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import otpModel from "../../models/otp/otp.js";

const userLogin = async (req, res) => {
  try {
    let { email, password, role } = req.body;

    const user = await userModel.findOne({ email: email });

    if (["distributer", "master", "retailer"].includes(role)) {
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      if (user.role === role) {
        //*! Generate OTP
        const generatedOTP = Math.floor(100000 + Math.random() * 900000);

        //*! Save OTP in the database
        const otpData = new otpModel({
          userId: user._id,
          userType: user.role,
          otp: generatedOTP,
        });
        await otpData.save();

        let token = jwt.sign(
          {
            userID: user._id.toString(),
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

        return res.status(200).send({
          status: true,
          msg: "OTP Sent",
          token: token,
          userID: user._id,
        });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "Please Provide User role" });
      }
    } else {
      return res.status(400).json({
        message: "Please select a valid role: MASTER, DISTRIBUTER, RETAILER",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

export default userLogin;
