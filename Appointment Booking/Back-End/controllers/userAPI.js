const express=require('express');
const User=require('../models/user');


exports.postUser= async (req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;

    console.log(name , email ,phone);
    console.log("..............");

    const data= await User.create({
        name:name,
        email:email,
        phone:phone
    });

    console.log(data);

    res.status(201).json({
        newUserDetails:data
    });
};

exports.getUser= async (req,res,next)=>{
    const users= await User.findAll();

    res.status(201).json({
        newUserDetails:users
    });
};


exports.deleteUser= async (req,res,next)=>{
    try{
        const userId= req.params.id;
        await User.destroy({
            where:{id:userId}
        });
        res.status(200);
    }catch(err){
        //console.log("......*...");
        console.log(err);
    }
};
