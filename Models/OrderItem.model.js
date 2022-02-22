import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});




const OrderItem = mongoose.model('OrderItem', orderItemsSchema);
export default OrderItem;