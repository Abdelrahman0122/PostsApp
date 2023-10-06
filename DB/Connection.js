import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect("mongodb://127.0.0.1:27017/socialMedia").then(()=>{
        console.log("connected to db")
    }).catch((err)=>{
        console.log(err)
    })
}