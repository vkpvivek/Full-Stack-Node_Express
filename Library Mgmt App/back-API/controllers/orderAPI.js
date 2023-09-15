const express=require('express');
const Order=require('../models/Order');


exports.addBook= async (req,res,next)=>{
    
    const Book=req.body.book;

    const data= await Order.create({
        Book :Book,
        fine :0,
        isReturned:false
    });

    console.log(data);

    res.status(201).json({
        newOrderDetails:data
    });
};

exports.getBooks= async (req,res,next)=>{
    const orders= await Order.findAll();

    res.status(201).json({
        newOrderDetails:orders
    });
};


exports.returnBook= async (req,res,next)=>{
    try{
        const orderId= req.params.id;
        const newfine=req.body.fine;

        const data= await Order.findOne({ where: { id: orderId } });
        data.isReturned = true,
        data.fine=newfine 
        await data.save()

        res.status(200);
    }catch(err){
        //console.log("......*...");
        console.log(err);
    }
};
