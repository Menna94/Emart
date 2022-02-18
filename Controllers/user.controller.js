import User from "../Models/User.model.js";
import mongoose from "mongoose";

//@desc     Fetch All Users
//@route    GET /api/v1/users
//@access   private
const fetchUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
    
        if(!users){
            return res.status(404).send({
                success: false,
                message: 'No Users Found!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'Users Fetched Successfully',
            count: users.length,
            data: users,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching Users',
            data: err.message,
        })
    }
    
}


//@desc     Fetch Single User
//@route    GET /api/v1/users/:id
//@access   public 
const fetchAUser = async(req,res,next)=>{
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

        const user = await User.findById(id);
    
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'No User Found With The Provided ID!',
                data: null,
            })
        }

        res.status(200).send({
            success: true,
            message: 'User Fetched Successfully',
            data: user,
        })
    } 
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching A User',
            data: err.message,
        })
    }
    
}


//@desc     Delete A User
//@route    DELETE /api/v1/users/:id
//@access   private 
const delUser = async(req,res,next)=>{
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

        //check if there's a user with the provided ID
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'No User Found With The Provided ID!',
                data: null,
            })
        }

        const deletedUser = await User.findByIdAndRemove(id);
        if(!deletedUser){
            return res.status(404).send({
                success: false,
                message: 'Could Not Delete The User!',
                data: null,
            })
        }
        //return the remainig users in the database & their count
        const users = await User.find();

        res.status(200).send({
            success: true,
            message: 'User Deleted Successfully!',
            count: users.length,
            data: users
        })
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Deleting A User',
            data: err.message,
        })
    }
}

export{
    fetchUsers,
    fetchAUser,
    delUser
}