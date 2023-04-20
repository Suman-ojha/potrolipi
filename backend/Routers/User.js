const router = require('express').Router();

const {getRegistrationData,UserLogin} =require('../controllers/auth')
const {UserDetails,updateUser}=require('../controllers/User')
const {verifyToken}=require('../utils/verifyToken')

// router.route('/register').get(getRegistrationData);
router.post('/register',getRegistrationData)
router.post('/login',UserLogin)
router.get("/user",verifyToken ,UserDetails);
router.put("/user",verifyToken ,updateUser);
router.get("/user/logout",verifyToken ,UserDetails);
 


module.exports=router