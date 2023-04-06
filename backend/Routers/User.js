const router = require('express').Router();

const {getRegistrationData} =require('../controllers/User')

// router.route('/register').get(getRegistrationData);
router.get('/register',getRegistrationData)

module.exports=router