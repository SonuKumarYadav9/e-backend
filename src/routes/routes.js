import express from "express";
// import adminController from "../controllers/adminController.js";
// import userController from "../controllers/userController.js";
// import rechargeController from "../controllers/rechargeController.js";
// import adminShortRecordController from "../controllers/adminShortRecordController.js";
import createAdmin from "../controllers/admin/createAdmin.js";
import adminLogin from "../controllers/admin/adminLogin.js";
import createUser from "../controllers/user/createUser.js";
import userLogin from "../controllers/user/userLogin.js";

import {offerCheckApi} from '../../src/controllers/recharge/mobile/prepaid/mobilePlan.js'
import {operatorFetch} from '../../src/controllers/recharge/mobile/prepaid/operatorCheck.js'
import { mobileRecharge } from '../../src/controllers/recharge/mobile/prepaid/recharge.js'
import { authMiddleware } from '../middlewares/auth'


const router = express.Router();


// const { createUser, userLogin, checkOTP, getUserById, getAllDistributers, getAllRetailer, getAllMaster, users, updateUser } = userController;
// const { authMiddleware } = middleware;
// const { operatorFetch, offerCheckApi, mobileRecharge } = rechargeController;
// const { generateMonthlyReport, generateDailyReport } = adminShortRecordController;

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

export default router
