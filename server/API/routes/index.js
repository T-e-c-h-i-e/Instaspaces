const express = require("express");
const router = express.Router();
const sendOtpController = require('../controllers/sendOTP.controller');
const getOtpController = require('../controllers/getOTP.controller');
const customerController = require('../controllers/customerDetail.controller');
const gstController = require('../controllers/gst.controller');
const LinkedInLogin = require('../controllers/linkedInLogin');
const GoogleLogin = require('../controllers/googleLogin');
const TOTP = require('../controllers/totp');
const SendLoginOTP = require('../controllers/sendOTPLogin');
const LoginOTP = require('../controllers/OTPLogin');
const popularSpace = require('../controllers/popularSpace');
// API ---------
router.route('/sendOTP').post(sendOtpController.SendOTP);
router.route('/getOTP').post(getOtpController.getOTP);
router.route('/customer').post(customerController.customer);
router.route('/GSTIN').get(gstController.getGST);
router.route('/GSTIN').post(gstController.postGST);
router.route('/GSTINU').post(gstController.updateGST);
router.route('/LinkedInLogin').post(LinkedInLogin.getEmailByLinkedIn);
router.route('/GoogleLogin').post(GoogleLogin.getEmailByGoogle);
router.route('/TOTP').get(TOTP.Totp);
router.route('/sendLoginOTP').post(SendLoginOTP.SendLoginOTP);
router.route('/loginOTP').post(LoginOTP.LoginOTP);
router.route('/popularSpace').get(popularSpace.Popular);
//
module.exports = router;