const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const otpModel = require("../models/otp")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  try {

    let {name,email,password,role}= req.body

    let parent_id = null;

    password = await bcrypt.hash(password, 10);

    const newUser = new adminModel({
      name: name,
      password: password,
      email: email,
      role: role,
      parent_id: parent_id,
    });
    
    let savedUser = await newUser.save();
    // if (savedUser) {
    //   let token = jwt.sign(
    //     {
    //       userID: savedUser._id.toString(),
    //     },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "2d" }
    //   );
      return res
        .status(200)
        .send({
          status: true,
          msg: "Registered Success",
          // token: token,
          // userID: savedUser._id,
          // userType: savedUser.role,
          // name: savedUser.name,
          data:savedUser
        });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

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
      otp: generatedOTP,
    });
    await otpData.save();

    // Delete OTP after one minute
    setTimeout(async () => {
      await otpModel.findOneAndDelete({ userId: user._id });
    }, 60000); // 1 minute

    // Generate JWT token
    const token = jwt.sign(
      {
        userID: user._id.toString(),
        otp: generatedOTP,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    // Construct the redirect URL with the generated OTP and additional data
    const redirectURL = `/otp-verify?userID=${user._id}&otp=${generatedOTP}&token=${token}&name=${user.name}`;

    return res.status(200).send({
      status: true,
      msg: "Enter your OTP",
      redirectURL: redirectURL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};



module.exports = { createAdmin, adminLogin };
