const mongoose = require("mongoose");

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL).then(()=>{
            console.log(`Connect to db`)
        }).catch((err)=> console.log(err));
    }catch(error){
        console.log(error);
    }
}

module.exports = connectToDb;