const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpModel = require("../models/otp")



const {
  namRegex,
  emailRegex,
  phoneRegex,
  bankRegex,
  panRegex,
  passwordRegex,
  addressRegex,
  cityRegex,
  pincodeRegex,
  stateRegex,
} = require("../validations/validation");

const createUser = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
      mobile,
      account,
      ifsc,
      bank,
      pan,
      aadhar,
      shopeName,
      address,
      district,
      state,
      pinCode,
      block,
      packages,
      credit,
    } = req.body;
    let parent_id;

    if (!namRegex(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid First Name" });
    }

    if (!phoneRegex(mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid mobile" });
    }

    let user = await userModel.findOne({ mobile: mobile });
    console.log(user);
    if (user) {
      return res.status(400).send({
        status: false,
        msg: "This user and its mobile are already registered",
      });
    }

    if (!emailRegex(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid email" });
    }

    let checkEmail = await userModel.findOne({ email: email });
    console.log(checkEmail);
    if (checkEmail) {
      return res.status(400).send({
        status: false,
        msg: "This user and its email are already registered",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(401).send({ status: false, msg: "Unauthorized" });
    }

    if (role === "master") {
      parent_id = req.user._id;
    } else if (role === "retailer") {
      if (
        req.user.role === "admin" ||
        req.user.role === "distributer" ||
        req.user.role === "master"
      ) {
        parent_id = req.user._id;
      } else {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
    } else if (role === "distributer") {
      if (req.user.role === "admin" || req.user.role === "master") {
        parent_id = req.user._id;
      } else {
        return res.status(401).send({ status: false, msg: "Unauthorized" });
      }
    } else {
      return res.status(400).send({ status: false, msg: "Invalid Role" });
    }

    if (!passwordRegex(password)) {
      return res.status(400).send({
        status: false,
        msg: "Password should contain 'a-z A-Z 0-9 !@#$%^&*' and be 8-15 characters long",
      });
    }

    if (!bankRegex(account)) {
      return res.status(400).send({
        status: false,
        msg: "Please enter a valid Bank Account Number",
      });
    }
    if (!panRegex(pan)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Pan Card Number" });
    }

    if (!addressRegex(address)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Address" });
    }

    if (!cityRegex(district)) {
      return res.status(400).send({ status: false, msg: "Please enter a valid District" });
    }

    if (!stateRegex(state)) {
      return res.status(400).send({ status: false, msg: "Please enter a valid State" });
    }

    // if (!pincodeRegex(pinCode)) {
    //   return res.status(400).send({ status: false, msg: "Please enter a valid Pincode" });
    // }

    password = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      password: password,
      email: email,
      mobile: mobile,
      account: account,
      ifsc: ifsc,
      bank: bank,
      aadhar: aadhar,
      pan: pan,
      shopeName: shopeName,
      address: address,
      district: district,
      state: state,
      pinCode: pinCode,
      block: block,
      packages: packages,
      credit: credit,
      role: role,
      parent_id: parent_id,
    });

    await newUser.save();

    let token = jwt.sign(
      {
        userID: newUser._id.toString(),
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    return res.status(201).send({
      status: true,
      msg: "User Created Successfully",
      data: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

//*USER LOGIN
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
        // Generate OTP
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

        let token = jwt.sign(
          {
            userID: user._id.toString(),
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

        // Construct the redirect URL with the generated OTP
        const redirectURL = `/otp-verify?userID=${user._id}&otp=${generatedOTP}`;

        return res.status(200).send({
          status: true,
          msg: "Enter your OTP",
          redirectURL: redirectURL,
          token:token,
          userId:user._id,
          name:user.name
        });
      } else {
        return res.status(404).send({ status: false, msg: "Please Provide User role" });
      }
    } else {
      return res.status(400).json({ message: "Please select a valid role: MASTER, DISTRIBUTER, RETAILER" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const checkOTP = async (req, res) => {
  try {
    const { userID, otp, token, name: encodedName } = req.query;

    // Find the OTP data in the database for the given user ID
    const otpData = await otpModel.findOne({ userId: userID });

    console.log(otpData);
    if (!otpData) {
      return res.status(404).json({ message: "OTP not found" });
    }

    // Convert the otp value to a number using parseInt()
    const enteredOTP = parseInt(otp, 10);

    // Check if the provided OTP matches the stored OTP
    if (enteredOTP === otpData.otp) {
      // Remove the OTP data from the database
      await otpData.deleteOne();

      const decodedName = decodeURIComponent(encodedName); // Use decodeURIComponent to decode the URL-encoded name

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





const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(401).send({ status: false, msg: "User not found" });
    }

    if (user._id.toString() !== userId) {
      return res.status(401).send({ status: false, msg: "Unauthorized user" });
    }

    if (req.user._id.toString() !== userId) {
      return res.status(401).send({ status: false, msg: "User not found" });
    }

    // console.log(req.user._id.toString());
    // console.log(userId);
    

    if (["master", "distributer", "retailer"].includes(user.role)) {
      return res.status(200).send({ status: true, msg: "Success", data: user });
    } else {
      return res.status(401).send({
        status: false,
        msg: "User does not have the required role",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllMaster = async (req, res) => {
  try {
    let masters = await userModel.find({ role: "master" });
    // console.log(masters)
    let parentId = req.user._id.toString();
    // console.log(parentId);

    if (masters) {
      if (req.user.role !== "admin") {
        return res.status(400).send({
          status: false,
          msg: "You are not authorized to perform this operation",
        });
      }
    }
    let filteredMasters = masters.filter((master) => {
      return master.parent_id.toString() === parentId;
    });
    // console.log(filteredMasters);
    return res
      .status(200)
      .send({ status: true, msg: "Success", data: filteredMasters });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const getAllDistributers = async (req, res) => {
  try {
    let distributers = await userModel.find({ role: "distributer" });
    // console.log(distributers);
    // console.log(req.user.role);
    if (distributers) {
      if (req.user.role !== "admin" && req.user.role !== "master") {
        return res
          .status(200)
          .send({ status: true, msg: "Success", data: distributers });
      }
    } else {
      return res.status(401).send({
        status: false,
        msg: "You are not authorized to perform this operation",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  checkOTP,
  getUserById,
  getAllMaster,
  getAllDistributers,
};
