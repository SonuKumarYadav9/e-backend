import adminModel from "../models/admin/adminModel.js";
import userModel from "../models/user/userModel.js";
import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log(authorization)

    if (authorization && authorization.startsWith("Bearer")) {
      let token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(userID)

      const admin = await adminModel.findById(userID).select("--password");
      // console.log(admin)
      const user = await userModel.findById(userID).select("--password");
      // console.log(user)


      if (admin) {
        req.user = admin;
        // console.log(req.user);
        // console.log(req.user.role);
        next();
      } else if (user) {
        req.user = user;
        // console.log(req.user);
        console.log(req.user.role);
        next();
      } else {
        return res
          .status(401)
          .send({ msg: "Unauthorised user Or Token is missing" });
      }
    } else {
      return res
        .status(401)
        .send({ msg: "Unauthorised user Or Token is missing" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message });
  }
};

export default  authMiddleware ;
