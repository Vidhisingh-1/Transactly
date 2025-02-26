const express=require("express");
const { authmiddleware } = require("./middleware");
const { Account } = require("../db");
const mongoose =require("mongoose");

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
router.post("/transfer",authmiddleware,async(req,res)=>{
    const session =await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;

    const account=await Account.findOne({
        userid:req.userId
    }).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }
    const toaccount=await Account.findOne({
        userid:to
    }).session(session);

    if(!toaccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne(
        {userid:req.userId},
        {$inc:{balance:-amount}}
    ).session(session); 

    await Account.updateOne(
        {userid:to},
        {$inc:{balance:amount}}
    ).session(session);

    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    });
}); 