import express from "express"



import createAdmin from "../controllers/admin/createAdmin.js";
import adminLogin from "../controllers/admin/adminLogin.js";
import createUser from "../controllers/user/createUser.js";
import userLogin from "../controllers/user/userLogin.js";
import offerCheckApi from '../../src/controllers/recharge/mobile/prepaid/mobilePlan.js'
import operatorFetch from '../../src/controllers/recharge/mobile/prepaid/operatorCheck.js'
import  mobileRecharge  from '../../src/controllers/recharge/mobile/prepaid/recharge.js'
import  checkOTP from '../controllers/user/otpVerify.js'
import { generateMonthlyReport,generateDailyReport} from '../controllers/shortRecord/admin/adminShortRecord.js'
import {getUserById,getAllMaster,getAllDistributers,getAllRetailer,users} from '../controllers/user/allUsers.js'
import updateUser from "../controllers/user/updateUser.js";

import {createAEPScommission , updateAEPScommission } from '../controllers/commission/AEPS/createCommission.js'

//*Middleware

import authMiddleware  from '../middlewares/auth.js'

const router = express.Router();

// Test API
router.get("/", (req, res) => res.send("Hello World!"));

// Register Admin API
router.post("/admin/register", createAdmin);
router.post("/user/register", authMiddleware, createUser);


// Admin Login API
router.post("/admin/login", adminLogin);
router.post("/login/user", userLogin);

// OTP Verification API
router.get("/otp-verify", checkOTP);

// Admin Routes
router.get('/masters', authMiddleware, getAllMaster);
router.get('/distributers', authMiddleware, getAllDistributers);
router.get('/retailers', authMiddleware, getAllRetailer);
router.get('/users', authMiddleware, users);
router.put('/user/update/:id', authMiddleware, updateUser);

// User Routes
router.get("/user/:id", authMiddleware, getUserById);

// Recharge Plan APIs
router.post("/mobile-plans", authMiddleware, offerCheckApi);
router.post("/operator-fetch", authMiddleware, operatorFetch);
router.post("/recharge/:id", authMiddleware, mobileRecharge);


// Monthly Report APIs
router.get('/daily-report', generateDailyReport);
router.get('/monthly-report', generateMonthlyReport);


//*  COMMISSION 
router.post("/create/aeps-commission",createAEPScommission) 
router.put("/update/aeps-commission",updateAEPScommission) 




router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found! or Url is Wrong" });
  });



export default router
