import User from "../Models/User.model.js";


//@desc     Signup
//@route    POST /api/v1/auth/signup
//@access   private 
const signUp = async(req,res,next)=>{
    try{
        const { name, img, countInStock } = req.body;

        const user = new User({name, img, countInStock});
        await user.save();
    
        if(!user){
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
    catch(err){
        res.status(500).send({
            success: false,
            message: 'Internal Server Error While Signing Up',
            data: err.message,
        })
    }
    
}


export{
    signUp
}