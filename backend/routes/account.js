const express=require("express");
const { authmiddleware } = require("./middleware");
const { Account } = require("../db");

const router=express.Router();

module.exports=router;

router.get("/balance",authmiddleware,async(requestAnimationFrame,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    res.status(200).json({
        balance:account.balance
    })
})
//good solution -to use transactions in mongodb
