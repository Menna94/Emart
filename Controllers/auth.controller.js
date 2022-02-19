import User from "../Models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc     Signup
//@route    POST /api/v1/auth/signup
//@access   public 
const signUp = async (req, res, next) => {
    try {
        let {
            name,
            email,
            password,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        } = req.body;

        password = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });
        await user.save();

        if (!user) {
            res.status(400).send({
                success: false,
                message: 'Error While Signing Up!',
                data: null,
            })
        }

        res.status(201).send({
            success: true,
            message: 'Signed Up Successfully',
            data: user,
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error While Signing Up',
            data: err.message,
        })
    }

}


//@desc     Login
//@route    POST /api/v1/auth/login
//@access   public 
const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'You Have To Provide email & password For Successful Login',
                data: null
            })
        }


    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({
            success: false,
            message: 'The Provided Email Is Not Available',
            data: null
        })
    }

    const matchPass = await user.matchPass(password);
    if (!matchPass) {
        return res.status(400).send({
            success: false,
            message: 'Please Recheck Your Password!',
            data: null
        })
    }

    const token = await user.getSignedToken();

    res.status(200).send({
        success: true,
        message: 'User Logged-in SUCCESSFULLY!',
        data: user,
        token,
    })
    }
    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error! Something Went Wrong While Logging The User In!!',
            data: err
        })
    }
    
}

export {
    signUp,
    login
}