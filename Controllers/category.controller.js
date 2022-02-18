import Category from "../Models/Category.model.js";
import mongoose from "mongoose";

//@desc     Create A Category
//@route    POST /api/v1/Categories
//@access   private 
const createCategory = async(req,res,next)=>{
    try{
        const { name, icon, color, img } = req.body;

        const category = new Category({name, icon, color, img });
        await category.save();
    
        if(!category){
            return res.status(400).send({
                success: false,
                message: 'Error While Creating A Category',
                data: null,
            })
        }

        res.status(201).send({
            success: true,
            message: 'Category Created Successfully',
            data: category,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Creating A Category',
            data: err.message,
        })
    }
    
}


//@desc     Fetch All Categories
//@route    GET /api/v1/Categories
//@access   public 
const fetchCategories = async(req,res,next)=>{
    try{
        const categories = await Category.find();
    
        if(!categories){
            return res.status(400).send({
                success: false,
                message: 'No Categories Found!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'Categories Fetched Successfully',
            count: categories.length,
            data: categories,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching Categories',
            data: err.message,
        })
    }
    
}


//@desc     Fetch Single Category
//@route    GET /api/v1/Categories/:id
//@access   public 
const fetchACategory = async(req,res,next)=>{
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
        const category = await Category.findById(id);
    
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'No Category Found With The Provided ID!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'Category Fetched Successfully',
            data: category,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching A Category',
            data: err.message,
        })
    }
    
}


//@desc     Update A Category
//@route    PUT /api/v1/Categories/:id
//@access   private 
const updateCategory = async(req,res,next)=>{
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

        //check if there's a Category with the provided ID
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'No Category Found With The Provided ID!',
                data: null,
            })
        }

        const newCategory = await Category.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true
        });

        if(!newCategory){
            return res.status(404).send({
                success: false,
                message: 'Could Not Update The Category!',
                data: null,
            })
        }

        const categories = await Category.find();

        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully!',
            count: categories.length,
            data: newCategory
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Updating A Category',
            data: err.message,
        })
    }
}


//@desc     Delete A Category
//@route    DELETE /api/v1/Categories/:id
//@access   private 
const delCategory = async(req,res,next)=>{
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
        
        //check if there's a Category with the provided ID
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'No Category Found With The Provided ID!',
                data: null,
            })
        }

        const deletedCategory = await Category.findByIdAndRemove(id);
        if(!deletedCategory){
            return res.status(404).send({
                success: false,
                message: 'Could Not Delete The Category!',
                data: null,
            })
        }
        //return the remainig Categories in the database & their count
        const categories = await Category.find();

        res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully!',
            count: categories.length,
            data: categories
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Deleting A Category',
            data: err.message,
        })
    }
}

export{
    createCategory,
    fetchCategories,
    fetchACategory,
    updateCategory,
    delCategory
}