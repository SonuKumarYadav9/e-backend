import userModel from "../../models/user/userModel";

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const {
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
        updateData.pin = pin;
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
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res
        .status(200)
        .json({
          status: true,
          msg: "User updated successfully",
          data: updatedUser,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, msg: error.message });
    }
  };



  export default  updateUser