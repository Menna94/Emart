import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    street:{
        type: String,
        default: '',
    },
    apartment:{
        type: String,
        default: '',
    },
    zip:{
        type: Number,
    },
    city:{
        type: String,
        default: '',
    },
    country:{
        type: String,
        default: '',
    },
});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals: true
});

//Match user entered password to hashed password
//return true/false
userSchema.methods.matchPass = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
}

//sign token with jwt
userSchema.methods.getSignedToken = function(){
    return jwt.sign(
        { 
            id: this._id, 
            isAdmin: this.isAdmin
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRATION
        }
    )
}

const User = mongoose.model('User', userSchema);
export default User;