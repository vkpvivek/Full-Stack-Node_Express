const Sequelize=require('sequelize');
const sequelize = require('../util/database');


const Order=sequelize.define('BookOrders',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fine:{
        type: Sequelize.INTEGER,
        default:0
    },
    Book:{ 
        type: Sequelize.STRING
    },
    isReturned:{
        type: Sequelize.BOOLEAN,
        default:false
    }
});

module.exports=Order;
