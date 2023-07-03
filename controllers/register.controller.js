const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/users.model')

// @desc    Register new user
// @route   POST /api/users
// @access  Public                                          // asyncHandler is used to wrap our async code to throw error
const registerUser = asyncHandler(async (req, res) => {
            
    // send data from xx-ww form encoded postman
    let { username, email, password } = req.body;
            console.log(username) // console.log(email)  // console.log(password)

            email=email?.toLowerCase(); // if email
           
            if (!username || !email || !password) {
                res.status(404).send(JSON.stringify({message :'Please fill all the fields'}));  // instead of send and converting to JSON we can use .json
            
                throw new Error('Please add all fields')
            }

            // Check if user exists
            const userExists = await User.findOne({ username })

            if (userExists) {
                res.status(400).send(JSON.stringify({message :'User already exists}'}));
                throw new Error('User already exists')
            }

            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Create user
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            })

            if (newUser) {
                res.status(201).json({
                    sucess: true,
                _id: newUser.id,
                name: newUser.username,
                // email: user.email,
                //   token: generateToken(user._id),   // it depends on us whether we want to send a token or not
                })
            } else {
                res.status(400).json({
                    message: 'error occured while creating account',
                })
                throw new Error('Invalid user data')
            }

})   
        
        
 
    


module.exports=registerUser;








