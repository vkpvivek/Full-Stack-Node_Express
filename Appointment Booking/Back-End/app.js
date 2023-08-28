const express=require('express');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');
const cors=require('cors');
//const User=require('./models/user');

const app=express();

app.use(express.json());  //to parse JSON request bodies

const userRoutes=require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(userRoutes);

// app.delete('/delete-user/:id',async (req,res,next)=>{
//     const userId= req.params.id;
//     console.log("..."+ userId);
//     await User.destroy({
//         where:{id:userId}
//     });
//     res.status(200);
// });


app.get('/',(req,res,next)=>{
    res.send('Not found');
})

sequelize.sync()
    .then(result=>
        app.listen(3000)
        //console.log("databse successfully setup")
    )
    .catch(err=>console.log(err));

