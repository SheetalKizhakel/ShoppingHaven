//order,product,user are my apis
//Often it is useful to group route handlers for a particular part of a site together and access them using a common route-prefix (e.g. a site with a Wiki might have all wiki-related routes in one file and have them accessed with a route prefix of /wiki/). In Express this is achieved by using the express.Router object.

import express from 'express'
const router=express.Router();
import{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders
} from '../controllers/orderController.js'
import { getProductById, getProducts } from '../controllers/productController.js';
import {protect,admin} from '../middleware/authMiddleware.js'
router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
export default router;