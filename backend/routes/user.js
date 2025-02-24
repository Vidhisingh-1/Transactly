const express=require("express");
const { string } = require("zod");
import zod from "zod";
import { Account, User } from "../db";
import bcrypt from "bcrypt"
import { authmiddleware } from "./middleware";
const router=express.Router();

const signupschema=zod.object({
    username:zod.string().min(3,"Username must be atleast 30 characters long"),
    firstname:zod.string().max(50,"Firstname must not exceed 50 characters"),
    lastname:zod.string().max(50,"Lastname must not exceed 50 characters"),
    password:zod.string().min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
})
router.post("/signup",async (req,res)=>
{
    const valid=signupschema.safeParse(req.body);
    if(!valid.success())
    {
        return res.status(400).json(valid.error.format());

    }
    const {firstname,lastname,username,password}=valid.data;
    const existinguser=await User.findOne({username});
    if(existinguser)
        return res.status(400).json({error:"username already exists"});
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username:username,
        password:hashedPassword,
        firstname:firstname,
        lastname:lastname,
    })
    const userid=User._id;
    await Account.create({
        userid,
        balance:1+Math.random()*10000
    })
    
    const token=jwt.sign({
        userid
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    })
})

router.post("/signin",async (req,res) => {
    const {username,password}=req.body;
    const isfound=await User.findOne({username});
    if(!isfound){
        return res.status(400).json({msg:"User not found"});

    }
    const match=await bcrypt.compare(password,isfound.password);
    if(!match){
        return res.status(400).json({msg:"Incorrect password"});

    }
    const token = jwt.sign({
        userId : isfound._id
       }, JWT_SECRET);
    
       res.json({
        message : "Successfully signed in",
        token : token
       });
})
const updateBody=zod.object({
    password:zod.string().optional,
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
})
router.put("/",authmiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({

            message:"Error encountered while updating the information"
            
            })
    }
    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message:"Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";

    const users=await User.find({
        $or:[{
            firstname:{
                "$regex":filter,
                "$options": "i" 
            }
        },{
            lastname:{
                $regex:filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        user:users.map(user=>({
           username:user.username,
           firstname:user.firstname,
           lastname:user.lastname,
           _id:user._id
        }))
    })

})
module.exports=router;