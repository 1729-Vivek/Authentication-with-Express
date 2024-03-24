const  JWT=require('jsonwebtoken')

//in middleware always remember to add next in function 

//next => it allows you to move from one process to another process

const jwtAuth=(req,res,next)=>{

    const token=(req.cookies&&req.cookies.token);

    if(!token)
    {
        return res.status(400).json({
            success:false,
            message:"Token doesn't exists"
        })
    }

    try{
        const payload=JWT.verify(token,process.env.SECRET);

        req.user={id:payload.id,email:payload.email};

    }   
    catch(e)
    {
        return res.status(400).json({
            success:false,
            message:"Not Authoriized"
        })
    }

    next();

}

module.exports=jwtAuth;