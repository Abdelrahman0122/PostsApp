
import { Schema,Types,model,mongoose } from "mongoose";

const PostsSchema = new mongoose.Schema({
    body:{
        type:String,
        required:[true,"please enter your body"],
        trim:true,
        minLength:[6,"your body must be more than 6 chars"]
    },
    postImage:{
        type:String,
    },
    userImage:{
        type:String,
    },
    userName:{
        type:String,
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
    LikedBy:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    Likes:{
        type:Number,
        default:0
    },
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

PostsSchema.virtual("myComment", {
    ref: "comment",
    localField: "_id",
    foreignField: "post",
  });
  
  PostsSchema.pre(/^find/, function () {
    this.populate("myComment");

  });

export const PostsModel = model('Post', PostsSchema)

