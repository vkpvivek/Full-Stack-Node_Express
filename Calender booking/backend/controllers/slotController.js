const express=require('express');
const User=require('../models/Slots');

exports.getSchedule= async (req,res,next)=>{
    const schedules= await User.findAll();

    res.status(201).json({
        newScheduleDetails:schedules
    });
};

