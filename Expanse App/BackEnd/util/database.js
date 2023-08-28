const Sequelize=require('sequelize');

const sequelize=new Sequelize('node_practice','root','zxcvbnm123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;