var express = require('express');
const { userLogin, userSignup, contactUs } = require('../controllers/userController');
const userAuth = require('../middleWares/userAuth');
var router = express.Router();


router.post('/login',userLogin);
router.post('/signup',userSignup);
router.post('/contact',userAuth,contactUs);

module.exports = router;
