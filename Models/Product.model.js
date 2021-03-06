import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    discription:{
        type: String,
        required:true,
    },
    richDiscription:{
        type: String,
        default: '',
    },
    img:{
        type: String,
        default: '',
    },
    imgs:[String],
    price:{
        type: Number,
        default: 0,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock:{
        type: Number,
        required:true,
        min: 0,
        max: 255
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default:0
    },
    numReviews:{
        type: Number,
        default:0
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
});

//change _id to id
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

productSchema.set('toJSON',{
    virtuals: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;