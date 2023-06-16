const express = require("express");
const router = express.Router();

//* Requiring Middlwares
// const { isAdmin, mid } = require("../middlewares/auth");

//* Requiring Controller
// const userController = require("../controllers/");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController")
const middleware = require("../middlewares/auth");

const { createAdmin, adminLogin } = adminController;

const { createUser,userLogin,checkOTP,getUserById,} = userController

const { authMiddleware } = middleware;

//* Test Api
router.get("/", (req, res) => res.send("Hello World!"));

// //* Resiterb Admin APi
router.post("/admin/register", createAdmin);
router.post("/user/register", authMiddleware, createUser)

//* Register Users Api

//* Login Api of Admin Users
router.post("/admin/login", adminLogin);
router.post("/login/user", userLogin);


// This is for both Admin Users 
router.get("/otp-verify", checkOTP);

//Recharge Plan

// router.post("/mobile-plans", authMiddleware, MobilePlan );
// router.get("/operator-fetch",authMiddleware, operatorFetch );
// router.get("/mobile-recharge", recharge );

module.exports = router;
