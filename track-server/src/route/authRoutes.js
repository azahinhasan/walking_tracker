const  express = require('express');
const mongoose = require('mongoose');
const User= mongoose.model('User');
const jwt = require('jsonwebtoken');
//https://jwt.io/

const router = express.Router();



    router.post('/signup',async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user = new User({email,password});
        await user.save();
        const token = jwt.sign({userId:user._id},"my_key")
        res.send({token});
    }catch(err){
        return res.status(422).send(err.message);
    }
    });


router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(422).send({error:'Must provider Email and Password'});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(424).send({error: 'Email no found'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId:user._id},'my_key')
        res.send({token});
    }catch(err){
        return res.status(422).send({error:err});
    }

});

module.exports= router;