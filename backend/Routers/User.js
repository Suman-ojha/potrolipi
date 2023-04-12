const router = require('express').Router();

const {getRegistrationData,UserLogin, verifyToken, UserDetails} =require('../controllers/User')

// router.route('/register').get(getRegistrationData);
router.post('/register',getRegistrationData)
router.post('/login',UserLogin)
router.get("/user",verifyToken,UserDetails);
 


module.exports=router