const express=require('express');
const app=express();
const cors = require('cors');

const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./DB/conn');

const usersRouter=require('./Routers/User')
app.use(cors({credentials:true,origin:'http://localhost:3000' }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Mount the users router at the /users endpoint
app.use('/',usersRouter)

app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server listening at ${port}...`);
})