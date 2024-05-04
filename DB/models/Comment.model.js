
import { Schema,Types,model,mongoose } from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:String,
    },
    userImage:{
        type:String,
    },
    userName:{
        type:String,
    },

},{timestamps:true})

export const commentModel = model('comment', commentSchema)