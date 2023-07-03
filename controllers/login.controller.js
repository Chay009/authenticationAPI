const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../models/users.model');
const asyncHandler=require('express-async-handler');
const { response } = require('express');


                                                     
// @desc    Authenticate a user
// @route   POST /api/users/login     
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
   
          let token; 
    if ( !email || !password) {
        res.status(404).send(JSON.stringify({message :'Please fill all the fields'}));  // instead of send and converting to JSON we can use .json
    
        throw new Error('Please add all fields')
    }

   
  
    // Check for user email
    const existingUser = await User.findOne({ email }).select('+password')

    //(await bcrypt.compare(password, user.password)) it is method which checks whether the password and password in DB are matching after decrypting and 
    // returns either true or false
  
    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {



      token=generateToken(existingUser._id);
        // generating a cookie it is like sending our cookie to browser which ic stored in cookies 
        res.cookie("usercookie",token,{
          expires:new Date(Date.now()+9000000),  // expires after 2.5 hour
          httpOnly:true
      });
  
      res.json({
        // the user id and token has to passed and in client they need to 
        // store in variables and on forget password they has to send them
        _id: existingUser.id,
        name: existingUser.username,
        email: existingUser.email,
        token:token ,
        cookie : req.cookies
      })



    

    } else {
      res.status(400).json({message : 'Invalid credentials'})
      throw new Error('Invalid credentials')
    }
  })




  
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
  }
module.exports=loginUser;