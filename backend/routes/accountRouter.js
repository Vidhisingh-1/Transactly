const express=require("express");
const zod = require('zod');
const { authMiddleware } = require("../middleware");
const { Account,User } = require("../db");
const mongoose =require("mongoose");

const accountRouter=express.Router();

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    const user = await User.findOne({
        _id : req.userId
    });

    return res.json({
        balance : account.balance,
        firstName : user.firstName
    });
});
//good solution -to use transactions in mongodb
const transferSchemaAmount = zod.coerce.number().min(1);

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    
    session.startTransaction(); 
    const { amount, to } = req.body;

    const isValidNumber = transferSchemaAmount.safeParse(amount);

    if (!(isValidNumber.success))
    {
        await session.abortTransaction();
        
        return res.json({
            message: "Amount must be a number"
        });
    }
const amt=isValidNumber.data;
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amt) {
        await session.abortTransaction();
        
        return res.json({
            message: "Insufficient balance"
        });
    }
    
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        
        return res.json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amt } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amt } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = {accountRouter};