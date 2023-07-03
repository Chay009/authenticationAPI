const express = require('express');
const router=express.Router({mergeParams: true})
const resetLink=require('../controllers/resetpassword')
// const {protect} = require('../middlewares/protect.route')



router.post('/',resetLink);


module.exports =router;