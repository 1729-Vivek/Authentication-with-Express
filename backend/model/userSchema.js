const mongoose=require('mongoose');

const {Schema}=mongoose;



//user schema  defines the structure of the document

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'user name is Required'],
        minLength:[5,'Name must be at least 5 char'],
        maxLength:[50,'Name must be less than 50 char'],
        time:true  //trimming means space which are there in the beginning or end will be trimmed off.
    },
    email:{
        type:String,
        required:[true,'User email is required'],
        lowercase:true,
        unique:[true,'already registered']
    },
    password:{
        type:String,
        select:false
    },
    forgetPasswordToken:{
        type:String,
    },
    forgotPasswordExpirydate:{
        type:Date
    }
},{
    timestamps:true
})


//user model define the for which user what kind of schema is being is used

const UserModel=mongoose.model('user',userSchema);

module.exports=UserModel;