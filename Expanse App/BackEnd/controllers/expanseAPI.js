const express=require('express');
const Expanse=require('../models/expanses');


exports.getExpanses= async (req,res,next)=>{
    const expanses= await Expanse.findAll();

    res.status(201).json({
        newExpanseDetails:expanses
    });
};

exports.getExpansesByID= async (req,res,next)=>{
    const expId=req.params.id;

    const expanse= await Expanse.findByPk(expId);

    res.status(201).json({
        newExpanseDetails:expanse
    });
};

exports.postExpanses= async (req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const categories=req.body.categories;


    const data= await Expanse.create({
        amount:amount,
        description:description,
        categories:categories
    });

    res.status(201).json({
        newExpanseDetails:data
    });
};


exports.deleteExpanses= async (req,res,next)=>{
    try{
        const expId= req.params.id;
        await Expanse.destroy({
            where:{id:expId}
        });
        res.status(200);
    }catch(err){
        console.log(err);
    }
};


exports.editExpanse = (req, res, next) => {
    const expId= req.params.id;
    const updatedAmount=req.body.amount;
    const updatedDescription=req.body.description;
    const updatedCategories=req.body.categories;

    Expanse.findByPk(expId)
        .then(expanse=>{
            expanse.amount=updatedAmount;
            expanse.description=updatedDescription;
            expanse.categories=updatedCategories;
            return expanse.save();
        })
        .then(result=>{
            console.log('UPDATE PRODUCT');
        })
        .catch(err=>console.log(err));
  };
