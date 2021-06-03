const mongoose = require('mongoose');
const User= mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

    const { authorization }=req.headers;
    //authorization === 'Bearer lakisjdffdsff...'

    if(!authorization){
        return res.status(401).send({error: 'You must be logged in.'});
    }

    const token = authorization.replace('Bearer ','');

    jwt.verify(token,"my_key",async(err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must logged in'});
        }

        const {userId}=payload;

        const user = await User.findById(userId);
        req.user=user;
        next(); //next meant we can run next middleware
    });
};