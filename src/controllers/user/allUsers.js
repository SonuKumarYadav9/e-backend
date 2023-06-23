import userModel from "../../models/user/userModel.js";



export const getUserById = async (req, res) => {
    try {
      let userId = req.params.id;
      let user = await userModel.findById(userId).select("-password");
  
      // console.log(user)
  
      if (!user) {
        return res.status(404).send({ status: false, msg: "User not found" });
      }
  
      if (user._id.toString() !== userId) {
        return res.status(401).send({ status: false, msg: "Unauthorized user" });
      }
  
      // if (req.user._id.toString() !== userId) {
      //   return res.status(401).send({ status: false, msg: "User not found" });
      // }
  
      // console.log(req.user._id.toString());
      // console.log(userId);
  
      if (["master", "distributer", "retailer"].includes(user.role)) {
        return res.status(200).send({ status: true, msg: "Success", data: user });
      } else {
        return res.status(400).send({
          status: false,
          msg: "User does not have the required role",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  export const getAllDistributers = async (req, res) => {
    try {
      if (req.user.role !== "admin" && req.user.role !== "master") {
        return res.status(401).send({
          status: false,
          msg: "You are not authorized to perform this operation",
        });
      }
  
      const distributers = await userModel.find({ role: "distributer" });
  
      return res
        .status(200)
        .send({ status: true, msg: "Success", data: distributers });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  export const getAllRetailer = async (req, res) => {
    try {
      if (
        req.user.role !== "admin" &&
        req.user.role !== "master" &&
        req.user.role !== "distributer"
      ) {
        return res.status(401).send({
          status: false,
          msg: "You are not authorized to perform this operation",
        });
      }
  
      const retailers = await userModel.find({ role: "retailer" });
  
      return res
        .status(200)
        .send({ status: true, msg: "Success", data: retailers });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  export const getAllMaster = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(401).send({
          status: false,
          msg: "You are not authorized to perform this operation",
        });
      }
  
      const masters = await userModel.find({ role: "master" });
  
      return res
        .status(200)
        .send({ status: true, msg: "Success", data: masters });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  
  export const users = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(401).send({
          status: false,
          msg: "You are not authorized to perform this operation",
        });
      }
  
      let users = await userModel.find({});
  
      return res.status(200).send({ status: true, msg: "Success", data: users });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message });
    }
  };
  

