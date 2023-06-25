import express from "express"


import createAdmin from "../controllers/admin/createAdmin.js";
import adminLogin from "../controllers/admin/adminLogin.js";
import createUser from "../controllers/user/createUser.js";
import userLogin from "../controllers/user/userLogin.js";
import offerCheckApi from '../../src/controllers/recharge/mobile/prepaid/mobilePlan.js'
import operatorFetch from '../../src/controllers/recharge/mobile/prepaid/operatorCheck.js'
import  mobileRecharge  from '../../src/controllers/recharge/mobile/prepaid/recharge.js'
import  verifyOTP from '../controllers/OTP/otpVerify.js'
import { generateMonthlyReport,generateDailyReport} from '../controllers/shortRecord/admin/adminShortRecord.js'
import {getUsers} from '../controllers/user/allUsers.js'
import updateUser from "../controllers/user/updateUser.js";
import {createAEPScommission , updateAEPScommission } from '../controllers/commission/AEPS/aeps.js'
import {createDMTcommission , updateDMTcommission } from '../controllers/commission/DMT/DMT.js'
import  {createNSDLpanCommission, updateNSDLcommission } from '../controllers/commission/PAN/NSDL.js' 
import  {createPANCommission, updatePANCommission } from '../controllers/commission/PAN/PAN.js' 
import  {createPayoutCommission, updatePayoutCommission } from '../controllers/commission/Payout/payout.js' 
import  {createRechargeCommission, updateRechargeCommission } from '../controllers/commission/Recharge/recharge.js' 


//*Middleware

import authMiddleware  from '../middlewares/auth.js'

const router = express.Router();

//🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢  //* API *//  🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

// Test API
router.get("/", (req, res) => res.send("Hello World!"));
// Register Admin API
router.post("/admin/register", createAdmin);
// Admin Login API
router.post("/admin/login", adminLogin);
// OTP Verification API
router.post("/otp-verify", verifyOTP);
// Admin Routes
// router.get('/masters', authMiddleware, getAllMaster);
// router.get('/distributers', authMiddleware, getAllDistributers);
// router.get('/retailers', authMiddleware, getAllRetailer);
router.post('/users', authMiddleware, getUsers);




router.put('/user/update/:id', authMiddleware, updateUser);
// User Routes
router.post("/user/register", createUser);
// router.get("/user/:id", authMiddleware, getUserById);
router.post("/login/user", userLogin);

// Recharge Plan APIs
router.post("/mobile-plans", authMiddleware, offerCheckApi);
router.post("/operator-fetch", authMiddleware, operatorFetch);
router.post("/recharge/:id", authMiddleware, mobileRecharge);
// Monthly Report APIs
router.get('/daily-report', generateDailyReport);
router.get('/monthly-report', generateMonthlyReport);

// COMMISSION 
//*AEPS
router.post("/create/aeps-commission",createAEPScommission) 
router.put("/update/aeps-commission",updateAEPScommission) 
//*DMT
router.post("/create/dmt-commission",createDMTcommission) 
router.put("/update/dmt-commission",updateDMTcommission) 
//*NSDL 
router.post("/create/nsdl-commission",createNSDLpanCommission )
router.put("/update/nsdl-commission",updateNSDLcommission )
//*PAN 
router.post("/create/pan-commission",createPANCommission )
router.put("/update/pan-commission",updatePANCommission )
//*Payout 
router.post("/create/payout-commission",createPayoutCommission )
router.put("/update/payout-commission",updatePayoutCommission )
//*Recharge 
router.post("/create/recharge-commission",createPayoutCommission )
router.put("/update/recharge-commission",updatePayoutCommission )



//🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢  //* API *//  🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢

router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found! or Url is Wrong" });
  });



export default router
