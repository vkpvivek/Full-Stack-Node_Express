const express=require('express');
const userController = require('../controllers/userAPI');
const router=express.Router();


router.get('/get-user',userController.getUser);

router.post('/add-user',userController.postUser);

router.delete('/delete-user/:id',userController.deleteUser);

//router.put('/edit-user',userController.editUser);

router.get('/home',(req,res,next)=>{
    res.send("HomePage");
});

module.exports=router;