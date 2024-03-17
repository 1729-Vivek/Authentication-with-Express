const UserModel=require('../model/userSchema.js')
const emailValidator=require("email-validator")
const signup=async(req,res,next)=>{
    const {name,email,password,confirmPassword}=req.body;
    console.log(name,email,password,confirmPassword);

    if(!name || !email || !password||!confirmPassword)
    {
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }



    const validEmail=emailValidator.validate(email);
    if(!validEmail)
    {
        return res.status(400).json({
            success:false,
            message:"Please provide a valid email id"
        })
    }

    if(password!==confirmPassword)
    {
        return res.status(400).json({
            success:false,
            message:"Password and ConfirmPassword doesn't match"
        })
    }
    try{
        const userInfo=UserModel(req.body);  //we wrote this because we defined userModel in our userSchema.js file where we require name ,email,password,confirmpassword
        //if we have not defined(or structure is not same) then we have to write it separately
    
        const result=await userInfo.save();
    
        return res.status(200).json({
            success:true,
            data:result
        });
    }
    catch(e)
    {
        if(e.code===11000)
        {
            return res.status(400).json({
                success:false,
                message:'Account already exists with provided email id'
            })
        }
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }



    
}
module.exports={
    signup
}