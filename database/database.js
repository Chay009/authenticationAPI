// in voting app users collections in database

const mongoose=require('mongoose');


mongoose.set('strictQuery' ,true);

const connectDB=async()=>{
try{

    const connection=await mongoose.connect(process.env.MONGO_URL,{
  
   useNewUrlParser : true,
  useUnifiedTopology :true,
  


    })
   
    

    console.log(`MongoDB connected`);

} 
catch(error){

console.log(` From database folder  error ${error}\n,${error.message}`);
process.exit(1);
}


}


module.exports=connectDB;
