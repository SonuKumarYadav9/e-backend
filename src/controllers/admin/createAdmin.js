import adminModel from "../../models/admin/adminModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const createAdmin = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
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

    if (savedUser) {
      let token = Jwt.sign(
        {
          userID: savedUser._id.toString(),
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      return res.status(200).send({
        status: true,
        msg: "Registered Success",
        token: token,
        userID: savedUser._id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

export default createAdmin;
