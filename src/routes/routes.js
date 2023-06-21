const express = require("express");
const router = express.Router();



//*! Requiring Controller
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController")

//*! Requiring Middlwares
const middleware = require("../middlewares/auth");

const { createAdmin, adminLogin } = adminController;

const { createUser,userLogin,checkOTP,getUserById, getAllDistributers, getAllRetailer,getAllMaster,users,updateUser } = userController

const { authMiddleware } = middleware;

const { operatorFetch,offerCheck,mobileRecharge }=require("../controllers/rechargeController")


const { generateMonthlyReport, generateDailyReport } = require("../controllers/adminShortRecordController")




//🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢  API  🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢



//**! Test Api
router.get("/", (req, res) => res.send("Hello World!"));

// //* Resiterb Admin APi
router.post("/admin/register", createAdmin);
router.post("/user/register", authMiddleware, createUser)


//*! Login Api of Admin Users
router.post("/admin/login", adminLogin);
router.post("/login/user", userLogin);


//*!This is for both Admin Users 
router.get("/otp-verify", checkOTP);


//*!ADMIN
router.get('/masters',authMiddleware, getAllMaster)
router.get('/distributers',authMiddleware, getAllDistributers)
router.get('/retailers',authMiddleware, getAllRetailer)
router.get('/users',authMiddleware, users)
router.put('/user/update/:id',authMiddleware, updateUser)


//*!USERS
router.get("/user/:id",authMiddleware, getUserById)


//Recharge Plan

router.post("/mobile-plans", authMiddleware, offerCheck );
router.post("/operator-fetch",authMiddleware, operatorFetch );
router.post("/recharge/:id", authMiddleware,mobileRecharge  );

//* Monthly Report API 
router.get('/daily-report',generateDailyReport)
router.get('/monthly-report',generateMonthlyReport)


module.exports = router;
