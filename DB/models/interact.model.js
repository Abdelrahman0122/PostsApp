
import { Schema,Types,model,mongoose } from "mongoose";

const InteractSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    likes:{
        type:Number,
        default:0, 
   },
   isLiked:{
       type:Boolean,
       default:false
   },
    comment:{
        type:String,
    },
},{timestamps:true})

export const InteractModel = model('Interact', InteractSchema)