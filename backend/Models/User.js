const mongoose =require('mongoose');
const validator = require('validator');
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        // validate: [validator.notEmpty, 'Name is empty']
    },
    lastName:{
        type:String,
        required:true,
        // validate: [validator.notEmpty, 'Name is empty']
    },
    email:{
        type:String,
        trim: true,
        required:true,
        lowercase: true,
        unique: true,
        validate: [
            // { validator: validator.notEmpty, msg: 'Email is empty' },
          { validator: validator.isEmail, msg: 'Invalid email' }
          ]

    },
    password:{
        type:String,
        required:true,
        // validate: [validator.notEmpty, 'Name is empty']
    },
    cpassword:{
        type: String,
        validate: {
          validator: function(cpassword) {
            return cpassword === this.password;
          },
          message: 'Confirm password does not match password',
        },

    }
})
const User=mongoose.model('user',userSchema)
module.exports=User