const { Router } = require('express');
const express = require('express');
const router = express.Router();
const authcontroller=require('../contoller/auth')
router.post('/register',authcontroller.register);
router.post('/login',authcontroller.login);
module.exports=router;