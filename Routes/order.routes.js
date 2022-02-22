import express from 'express';
const router = express.Router();

import { 
    createOrder,
    fetchOrders,
    fetchAnOrder,
    delOrder,
    updateOrderStatus
} from '../Controllers/order.controller.js';
import filterByModel from '../Middlewares/filterQuery.middleware.js';
import Order from '../Models/Order.model.js';

//Create An Order
//POST /api/v1/orders
router.post('/', createOrder);

//Fetch All Orders
//GET /api/v1/orders
router.get('/', filterByModel(Order, [
    {
        path: 'user', select: 'name email'
    }, 
    {
        path: 'orderItems', populate:{ path: 'product', select: 'name price'}
    }
]) 
,fetchOrders);

//Fetch A Single Order
//GET /api/v1/orders/:id
router.get('/:id',filterByModel(Order, [
    {
        path: 'user', select: 'name email'
    }, 
    {
        path: 'orderItems', populate:{ path: 'product', select: 'name price'}
    }
]), fetchAnOrder);

//Update An Order
//PUT /api/v1/orders/:id
router.put('/:id', updateOrderStatus);

//Delete An Order
//DELETE /api/v1/orders/:id
router.delete('/:id', delOrder);

export default router;