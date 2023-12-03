//The controller accepts user requests, interacts with the model and selects the view for response.
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
//description-Fetch All Products
//route-GET /api/products
//access- Public
const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    res.json(products);
});
//description-Fetch a Product
//route-GET /api/products/:id
//access- Public
const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(product){
    return res.json(product);
    }
    res.status(404);
    throw new Error('resource not found');
});
export {getProductById,getProducts};