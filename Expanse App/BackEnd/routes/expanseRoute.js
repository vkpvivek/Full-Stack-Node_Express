const express=require('express');
const expanseController=require('../controllers/expanseAPI');
const router=express.Router();



router.get('/get-expanse',expanseController.getExpanses);

router.post('/add-expanse',expanseController.postExpanses);

router.delete('/delete-expanse/:id',expanseController.deleteExpanses);

router.get('/get-expanseById/:id',expanseController.getExpansesByID);

router.put('/edit-expanse/:id',expanseController.editExpanse);


module.exports=router;