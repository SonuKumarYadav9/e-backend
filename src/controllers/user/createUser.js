import userModel from "../../models/user/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import otpModel from "../../models/otp/otp.js";

// import {namRegex,emailRegex,phoneRegex,bankRegex,panRegex,passwordRegex,addressRegex,cityRegex,pincodeRegex,stateRegex,} from "../validations/validation.js";

const createUser = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      pin,
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

    // if (req.user.role !== "admin") {
    //   return res.status(401).send({ status: false, msg: "Unauthorized" });
    // }

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
        return res.status(401).send({ status: false, msg: "Unauthorized 1" });
      }
    } else if (role === "distributer") {
      if (req.user.role === "admin" || req.user.role === "master") {
        parent_id = req.user._id;
      } else {
        return res.status(401).send({ status: false, msg: "Unauthorized 2" });
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
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid District" });
    }

    if (!stateRegex(state)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid State" });
    }

    // if (!pincodeRegex(pinCode)) {
    //   return res.status(400).send({ status: false, msg: "Please enter a valid Pincode" });
    // }

    password = await bcrypt.hash(password, 10);
    pin = await bcrypt.hash(pin, 10);

    const newUser = new userModel({
      name: name,
      password: password,
      pin: pin,
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

export  default createUser