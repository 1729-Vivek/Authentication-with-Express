const express=require('express');
const app=express();
const authRouter=require('./router/authRoute');
const databaseconnect = require('./config/databaseConfig');
const cookieParser=require('cookie-parser')
const cors=require('cors');

databaseconnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://192.168.144.47:3000',
    credentials: true
}));

app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.144.47:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.use('/api/auth/',authRouter)



app.use('/',(req,res)=>{
    res.status(200).json({data : 'JWTauth Server --server update'})
});

module.exports=app;