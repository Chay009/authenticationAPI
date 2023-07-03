const express=require('express');
const mongoose=require('mongoose');
const connectDB=require('./database/database')
const dotenv=require('dotenv');
dotenv.config({path : '.env'}) 
const cookieParser=require('cookie-parser');
const app = express();

const PORT=80;



connectDB();

app.use(express.json())// once server defined we need to parse everydata which is form json
// middleware to parse cookies
app.use(cookieParser());


app.use(express.urlencoded({ extended: false }));  // must  we need to add this everytime 

const loginRouteHandler=require('./routes/login.route');
const registerRouteHandler=require('./routes/register.route');
const profileRouteHandler=require('./routes/profile.route.private');
const forgetPasswordRouteHandler=require('./routes/forgetpassword.route');
const resetLinkRouteHandler=require('./routes/resetlink.route');



// add middle ware for autheorization

app.use('/api/auth/register',registerRouteHandler)//register
app.use('/api/auth/login',loginRouteHandler)//login
app.use('/api/user/profile',profileRouteHandler)//profile
app.use('/api/auth/forgetpassword/:id/:token',forgetPasswordRouteHandler)//forgetpassword
app.use('/api/forgetpassword/resetlink/:id/:resetToken',resetLinkRouteHandler)//resetting link



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}  http://127.0.0.1:80`);
})

// frontend cookie getCookie() function to verify cookie exists or not  learn more about it 