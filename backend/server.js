import express from 'express';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
const port=process.env.PORT||5000;
//Whenever you want to access one of the environment variables you prefix it with process.env.||5000 is fallback option
connectDB()
const app=express();

//Body parser middelware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//creating routes and requests for server through HTTP methods. REST Api use HTTP methods
//route for home ie localhost:5000/. Ultimatley this is goinf to load our React application
app.get('/',(req,res)=>{
    res.send('API is running');
});
//use is a method to configure the middleware used by the routes of the Express HTTP server object.
//Mapping routes to our files
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}));//adding the paypal path
app.use(notFound)

app.use(errorHandler)


app.listen(port,()=>console.log(`Server running on port ${port}`));
