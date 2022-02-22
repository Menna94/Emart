// ORDER ITEM DEMO
/**
 {
    "orderItems":[
        {
            "quantity":3,
            "product":"620ea06e79e29526f6928a72"
        },
        {
            "quantity":1,
            "product":"620ea0f81b4230c7582c6a20"
        }
    ],
    shippingAddress1:"Street 1 , 41",
    shippingAddress2 : "45",
    city: "Tanta",
    country:"Egypt",
    status:"Delivered",
    zip:12345,
    totalPrice: 123,
    user:"6211142dd16e164bddfa1e14",
    phone:123456789,
    dateOrdered:1645383727974
 }
*/

import mongoose from "mongoose";
import OrderItem from "./OrderItem.model.js";



const orderSchema = new mongoose.Schema({
    orderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type: String,
        required:true
    },
    shippingAddress2 : String,
    city:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required:true,
        default: 'Pending'
    },
    zip:{
        type: Number,
        required:true
    },
    totalPrice: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone:{
        type:Number,
        required:true
    },
    dateOrdered:{
        type: Date,
        default: Date.now
    }
});

//creating id field from _id -> frontend firndly
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON',{
    virtuals: true
})

orderSchema.methods.calcTotalPrice = async function(){
    const total = 0;
    const prices = this.orderItems.map(item=>{
        const d = this.model('OrderItem').populate({
            path: 'product',
            select: 'price'
        })
        console.log(d);
    })
    return prices;
};
calcTotalPrice();
const Order = mongoose.model('Order', orderSchema);
export default Order;