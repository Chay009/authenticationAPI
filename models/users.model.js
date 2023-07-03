const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userID :{
type : mongoose.Schema.Types.ObjectId    // saves user id 

    },
    username:{
        type: 'string',
        unique: true,
        required: [true,'username already exists']   // if error prints this
    },
    email :{
        type: 'string',
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ], // to verify whether the string provided is valid as email
    },
    password :{
        type: 'string',
        required: true,
        minlength:6, // the minimum length of the password must be 6 characters
        select:false, // while querying for user sometimes password is also queried so to prevent we are setting select as false
    },

  
   
} ,

{timestamps :true});  // stores time at which creted and accessed as CreatedAt method

module.exports =mongoose.model('user',userSchema);