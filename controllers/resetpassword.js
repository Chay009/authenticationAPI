const User=require('../models/users.model')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const resetLink=async (req,res)=>{


    const {id,resetToken}=req.params;
    // note use this token to verify with id or something the only newpasssowrd
    

    const NewPassword=req.body.Newpassword;
    
    
    const validUser=await User.findOne({_id:id})  
    if(validUser) {
       // res.send({message:'You do not have permission to this route'})
        // Hash password
       // Hash password
       const newpassword = await bcrypt.hash(NewPassword,12);

       const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

       setnewuserpass.save();

        res.status(201).json({success : true,message : 'Password updated successfully'});

    
    
       
    }

    else{
        res.status(401).json({status:401,message:"user not exist"})
    }
    
    

}

module.exports =resetLink;