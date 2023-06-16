const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      let token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);

      const admin = await adminModel.findById(userID).select("--password");
      const user = await userModel.findById(userID).select("--password");

      if (admin) {
        req.user = admin;
        console.log(req.user);
        console.log(req.user.role);
        next();
      } else if (user) {
        req.user = user;
        console.log(req.user);
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

module.exports = { authMiddleware };
