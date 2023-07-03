const User=require('../models/users.model')
const jwt=require('jsonwebtoken');


const forgetPassword=async (req,res)=>{
  

    // do some more like JWT is not fully used watch jwt authetication and modify 
    const {id,token}=req.params;

    //since we cretaed jwt uing user id

    jwt.verify(token,process.env.JWT_SECRET)

    if( !id){
        res.status(401).json({status:401,message:"some info missing"})
    }


try {
    const userExists=await User.findOne({_id : id});

    if(!userExists){
        res.status(404).json({success :false ,message :`No acccount linked with this mail`})
    };


       // token generate for reset password // 15 mins
        const resetToken = jwt.sign({_id:userExists._id},process.env.JWT_SECRET,{
            expiresIn:"900s"
        });

        // use this link to 
    
        res.json({resetToken ,message:'vist link expires in 15 min',link :`http://localhost:80/api/forgetpassword/resetlink/${userExists._id}/${resetToken}`}) // mail hast to be sent 




} catch (error) {
    
}
    

};




module.exports=forgetPassword;





// async(req,res)=>{
//     console.log(req.body)

//     const {email} = req.body;

//     if(!email){
//         res.status(401).json({status:401,message:"Enter Your Email"})
//     }

//     try {
//         const userfind = await userdb.findOne({email:email});

//         // token generate for reset password
//         const token = jwt.sign({_id:userfind._id},keysecret,{
//             expiresIn:"120s"
//         });
        
//         const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


//         if(setusertoken){
//             const mailOptions = {
//                 from:process.env.EMAIL,
//                 to:email,
//                 subject:"Sending Email For password Reset",
//                 text:`This Link Valid For 2 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
//             }

//             transporter.sendMail(mailOptions,(error,info)=>{
//                 if(error){
//                     console.log("error",error);
//                     res.status(401).json({status:401,message:"email not send"})
//                 }else{
//                     console.log("Email sent",info.response);
//                     res.status(201).json({status:201,message:"Email sent Succsfully"})
//                 }
//             })

//         }

//     } catch (error) {
//         res.status(401).json({status:401,message:"invalid user"})
//     }

// }