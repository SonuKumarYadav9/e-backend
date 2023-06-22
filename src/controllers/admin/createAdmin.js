import adminModel from "../models/adminModel.js";
import otpModel from "../models/otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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



export default { createAdmin  };