
import { Schema,Types,model,mongoose } from "mongoose";

const PostsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter your title"],
        trim:true,
        maxLength:[30,"your title must be less than 30 chars"]
    },
    body:{
        type:String,
        required:[true,"please enter your body"],
        trim:true,
        minLength:[6,"your body must be more than 6 chars"]
    },
    privcy:{
        type:String,
        enum:["public","private"],
        default:"public"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})

export const PostsModel = model('Post', userSchema)

