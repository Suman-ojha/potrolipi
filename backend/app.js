const express=require('express');
const app=express();
require('dotenv').config();
require('./DB/conn');

const usersRouter=require('./Routers/User')

app.use(express.json())
// Mount the users router at the /users endpoint
app.use('/',usersRouter)



const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server listening at ${port}...`);
})