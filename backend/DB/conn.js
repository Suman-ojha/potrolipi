const mongoose= require('mongoose')
const uri=process.env.MONGO_URI
const connection=async(uri)=>{
    try {
        await mongoose.connect(uri);
        console.log(`connection successfull...`);
        
    } catch (error) {
        console.log(`connection failed...`);
    }
}
connection(uri);