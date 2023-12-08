import express from 'express';
import path from 'path';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
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
/*app.get('/',(req,res)=>{
    res.send('API is running');
});*/
//use is a method to configure the middleware used by the routes of the Express HTTP server object.
//Mapping routes to our files
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes)
app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}));//adding the paypal path
const __dirname=path.resolve();//Set __dirname to current directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV==='production')//for deployment
{
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    );
}
else
{
    app.get('/',(req,res)=>{
        res.send('API is running....');
    });
}
app.use(notFound)

app.use(errorHandler)


app.listen(port,()=>console.log(`Server running on port ${port}`));
