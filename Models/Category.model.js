import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    icon:{
        type: String,
    },
    color:{
        type: String,
    },
    img:{
        type: String,
        default: '',
    },
});


const Category = mongoose.model('Category', categorySchema);
export default Category;