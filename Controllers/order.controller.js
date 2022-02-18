import Order from "../Models/Order.model.js";
import mongoose from "mongoose";

//@desc     Create An Order
//@route    POST /api/v1/orders
//@access   private 
const createOrder = async(req,res,next)=>{
    try{
        const { name, img, countInStock } = req.body;

        const order = new Order({name, img, countInStock});
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
            data: Order,
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
    delOrder
}