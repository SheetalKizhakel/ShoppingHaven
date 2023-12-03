//script that we will run that will seed all of our data into the database. It is used to initially populate the database with some data
//the data we are using to seed is still products.js and the users from users.js
//Any time we make queries to the database,it's going to be through a model
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();//to connect to our database
const importData=async()=>{
    try{
        await Order.deleteMany();//delete everything from Order collection
        await Product.deleteMany();//delete everything from Product collection
        await User.deleteMany();
        const createdUsers=await User.insertMany(users);//create the three users from our users.js file
        const adminUser=createdUsers[0]._id;//we had set the first user as an admin
        const sampleProducts=products.map((product)=>{
            return{...product,user:adminUser};
        });
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!'.green.inverse);
        process.exit()
    }
    catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}
const destroyData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    }
    catch(error)
    {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
if(process.argv[2]==='-d')
{
    destroyData();
}
else
{
    importData();
}