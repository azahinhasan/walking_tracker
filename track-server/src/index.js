
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRouters = require('./route/authRoutes')
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');


const app = express();

app.use(bodyParser.json());
app.use(authRouters);


const mongoUri = 'mongodb+srv://admin:123@cluster0.u3psp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

mongoose.connection.on('connected',()=>{
    console.log('Conncted to mongo instance');
})

mongoose.connection.on('error',(err)=>{
    console.error("Error Conectiong to mongo ",err);
})


app.get('/',requireAuth,(req,res)=>{
    res.send(`Email:${req.user.email}`);
})

app.listen(3001,()=>{
    console.log('Yo Brahh');
});