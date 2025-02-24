const mongoose =require("mongoose");
const zod=require("zod");
require('dotenv').config();
const dburl=process.env.mongodburl;
mongoose.connect(dburl);


const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:30,
        lowercase:true
    },
    firstname:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    
    password:{
        type:String,
        required:true,
        minlength:6
    },
    
})
const bankschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,

    }
});
const Account=mongoose.model('Account',bankschema);
const User=mongoose.model("User",userschema);
module.exports={
    User,
    Account,
}; 
