import express from 'express';
const router = express.Router();

import { 
    createOrder,
    fetchOrders,
    fetchAnOrder,
    delOrder
} from '../Controllers/order.controller.js';

//Create An Order
//POST /api/v1/orders
router.post('/', createOrder);

//Fetch All Orders
//GET /api/v1/orders
router.get('/', fetchOrders);

//Fetch A Single Order
//GET /api/v1/orders/:id
router.get('/:id', fetchAnOrder);

//Delete A Order
//DELETE /api/v1/orders/:id
router.delete('/:id', delOrder)

export default router;