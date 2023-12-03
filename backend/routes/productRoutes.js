//file which contains route for product
//connect controller functions to routes
import express from 'express';
import { getProducts,getProductById } from '../controllers/productController.js';
const router=express.Router();
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
//import products from '../data/products.js';

//we need asynchandler because mongoose always returns back a promise
//route for all products.products is the file where my product info is stored in backend
/*/api/products will be directly linked to this file. so in get no need to write /api/products and /api/products/:id*/
/*router.get('/',asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    res.json(products);
}))
//route for single product.:id is a placeholder for whatever the id is. Go through products array and check if it matches id in url
router.get('/:id',asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(product){
    return res.json(product);
    }
    res.status(404);
    throw new Error('resource not found');
}));*/
export default router;