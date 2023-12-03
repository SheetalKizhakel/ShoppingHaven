//this the file  where we want to connect to our database from
import mongoose from "mongoose";
//it is asnchronous because any methods that we call,whether its from mongoose model or from mongoose itself,it's going to return a promise.So you can either .catch syntax or async await
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(`Error:${error.message}`);
        process.exit(1);
    }

};
export default connectDB;