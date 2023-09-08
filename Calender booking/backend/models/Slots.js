const Sequelize=require('sequelize');
const sequelize = require('../util/database');

const Slots=sequelize.define('Slots',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    SlotTime:{
        type: Sequelize.STRING
    },
    availableSlot:{ 
        type: Sequelize.INTEGER,
        unique:true
    }
});