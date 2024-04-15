import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export function dbConnection(){
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("connected to db")
    }).catch((err)=>{ 
        console.log(err)
    })
}