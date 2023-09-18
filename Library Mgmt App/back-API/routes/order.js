const express=require('express');
const orderController = require('../controllers/orderAPI');
const router=express.Router();


router.get('/get-books',orderController.getBooks);

router.post('/add-book',orderController.addBook);

router.put('/return-book/:id',orderController.returnBook);


router.get('/home',(req,res,next)=>{
    res.send("HomePage");
});

module.exports=router;