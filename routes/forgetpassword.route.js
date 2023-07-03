const express = require('express');
const router=express.Router();
const forgetPassword = require('../controllers/forgetpassword.controller');

router.post('/', forgetPassword);


module.exports =router;