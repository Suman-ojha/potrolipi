const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.json({"msg":"hello from home"})
})


const port=5000
app.listen(port,()=>{
    console.log(`server listening at ${port}...`);
})