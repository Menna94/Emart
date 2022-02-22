import Order from "../Models/Order.model.js";
import mongoose from "mongoose";
import OrderItem from "../Models/OrderItem.model.js";

//@desc     Create An Order
//@route    POST /api/v1/orders
//@access   private 
const createOrder = async(req,res,next)=>{
    try{
        //first, create order item/s using OrderItem model
        const orderItemsIds = 
            Promise.all(req.body.orderItemsArr.map(async item=>{
                    let orderItem = new OrderItem({
                        quantity: item.quantity,
                        product: item.product
                    });

                    orderItem = await orderItem.save();
                    console.log(orderItem._id);
                    return orderItem._id;
                })
            )
        const orderItems = await orderItemsIds;
            
        const { 
            shippingAddress1,
            shippingAddress2,
            city,
            country,
            status,
            zip,
            totalPrice,
            user,
            phone,
        } = req.body;

        const order = new Order({
            orderItems,
            shippingAddress1,
            shippingAddress2,
            city,
            country,
            status,
            zip,
            totalPrice,
            user,
            phone,
        });
        await order.save();
    
        if(!order){
            return res.status(400).send({
                success: false,
                message: 'Error While Creating An Order',
                data: null,
            })
        }

        res.status(201).send({
            success: true,
            message: 'Order Created Successfully',
            data: order,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Creating An Order',
            data: err.message,
        })
    }
    
}


//@desc     Fetch All Orders
//@route    GET /api/v1/orders
//@access   public 
const fetchOrders = async(req,res,next)=>{
    try{
        const orders = await Order.find();
    
        if(!orders){
            return res.status(404).send({
                success: false,
                message: 'No Orders Found!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'Orders Fetched Successfully',
            count: orders.length,
            data: orders,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching Orders',
            data: err.message,
        })
    }
    
}


//@desc     Fetch Single Order
//@route    GET /api/v1/orders/:id
//@access   public 
const fetchAnOrder = async(req,res,next)=>{
    try{
        const id = req.params.id;

        //check if the id is a valid mongoose id
        const isValidID = mongoose.isValidObjectId(id);
        if(!isValidID){
            return res.status(400).send({
                success: false,
                message: "The Provided ID Is Not A Vaid MongooseID!",
                data: null,
            });
        }

        const order = await Order.findById(id);
    
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'No Order Found With The Provided ID!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'Order Fetched Successfully',
            data: order,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching An Order',
            data: err.message,
        })
    }
    
}


//@desc     Update An Order
//@route    PUT /api/v1/orders/:id
//@access   private 
const updateOrderStatus = async(req,res,next)=>{
    try{
        const id = req.params.id;
        
        //check if the id is a valid mongoose id
        const isValidID = mongoose.isValidObjectId(id);
        if(!isValidID){
            return res.status(400).send({
                success: false,
                message: "The Provided ID Is Not A Vaid MongooseID!",
                data: null,
            });
        }

        //check if there's an order with the provided ID
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'No Order Found With The Provided ID!',
                data: null,
            })
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, {status: req.body.status}, {
            new: true,
            runValidators: true
        });

        if(!updatedOrder){
            return res.status(404).send({
                success: false,
                message: 'Could Not Update The Order!',
                data: null,
            })
        }
        //return the remainig orders in the database & their count
        const orders = await Order.find();

        res.status(200).send({
            success: true,
            message: 'Order Updated Successfully!',
            count: orders.length,
            data: order
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Deleting An Order',
            data: err.message,
        })
    }
}


//@desc     Delete An Order
//@route    DELETE /api/v1/orders/:id
//@access   private 
const delOrder = async(req,res,next)=>{
    try{
        const id = req.params.id;
        
        //check if the id is a valid mongoose id
        const isValidID = mongoose.isValidObjectId(id);
        if(!isValidID){
            return res.status(400).send({
                success: false,
                message: "The Provided ID Is Not A Vaid MongooseID!",
                data: null,
            });
        }

        //check if there's an order with the provided ID
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'No Order Found With The Provided ID!',
                data: null,
            })
        }
        await order.orderItems.map(async item=>{
            await OrderItem.findByIdAndRemove(item._id);
        })
        const deletedOrder = await Order.findByIdAndRemove(id);
        if(!deletedOrder){
            return res.status(404).send({
                success: false,
                message: 'Could Not Delete The Order!',
                data: null,
            })
        }
        //return the remainig orders in the database & their count
        const orders = await Order.find();

        res.status(200).send({
            success: true,
            message: 'Order Deleted Successfully!',
            count: orders.length,
            data: orders
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Deleting An Order',
            data: err.message,
        })
    }
}

export{
    createOrder,
    fetchOrders,
    fetchAnOrder,
    updateOrderStatus,
    delOrder
}