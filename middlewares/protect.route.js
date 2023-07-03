const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/users.model');



//middlewares is a type of function but with extra argument passed next

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer'))   // the token syntax is    Bearer hu4rru899338jfn94203034
   {


          // Get token from header
          token = req.headers.authorization.split(' ')[1]    //splitting with space ie [0] is Bearer and [1] is  hu4rru899338jfn94

    
    try {


      // Verify token by dedecoding 
      const decoded = jwt.verify(token, process.env.JWT_SECRET) 
   

      // Get user from the token
      const userFound = await User.findById(decoded.id).select('-password')

      if(!userFound) {
                res.json({success: false, message:'user not found'})
      }

      req.user=userFound;

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({success: false, message:'you are NOT authorized to this route'})
      throw new Error('you are NOT authorized to this route')
    }
  }

  if (!token) {
    res.status(401).json({message :'Not authorized, no token'})
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }