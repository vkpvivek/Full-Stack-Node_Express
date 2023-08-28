const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const cors=require('cors');


const app=express();

app.use(express.json());  //to parse JSON request bodies

const expRoutes=require('./routes/expanseRoute');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(expRoutes);





app.get('/',(req,res,next)=>{
    res.send('Not found');
})

sequelize.sync()
    .then(result=>
        app.listen(3000)
        //console.log("databse successfully setup")
    )
    .catch(err=>console.log(err));

