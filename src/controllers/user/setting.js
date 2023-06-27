import userModel from "../../models/user/userModel.js";
import bcrypt from "bcrypt";
import otpModel from "../../models/otp/otp.js";
import adminModel from "../../models/admin/adminModel.js";



const updateDetail = async (req, res) => {
  try {
    const {
      id,
      name,
      password,
      email,
      pin,
      address,
      mobile,
      account,
      bank,
      ifsc,
      shopeName,
    } = req.body;

    let user = await userModel.findById(id);
    console.log(user);

    if (
      user &&
      (user.role === "retailer" ||
        user.role === "master" ||
        user.role === "distributor")
    ) {
      const updateData = {};

      if (name) {
        updateData.name = name;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      if (email) {
        updateData.email = email;
      }

      if (pin) {
        const hashedpin = await bcrypt.hash(pin, 10);
        updateData.pin = hashedpin;
      }

      if (address) {
        updateData.address = address;
      }

      if (mobile) {
        updateData.mobile = mobile;
      }

      if (account) {
        updateData.account = account;
      }

      if (bank) {
        updateData.bank = bank;
      }

      if (ifsc) {
        updateData.ifsc = ifsc;
      }

      if (shopeName) {
        updateData.shopeName = shopeName;
      }

      const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
 
    } else {
      let admin = await adminModel.findById(id);
      console.log(admin);
      if (admin && admin.role === "admin") {
        let updatedAdminData = {};

        if (name) {
          updatedAdminData.name = name;
        }

        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          updatedAdminData.password = hashedPassword;
        }

        if (email) {
          updatedAdminData.email = email;
        }

        const updatedAdmin = await adminModel.findByIdAndUpdate(
          id,
          updatedAdminData,
          { new: true }
        );

        return res.status(200).send({ status: true, msg: "OTP SENT " });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};



export default updateDetail;
