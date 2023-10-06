import { Schema,Types,model,mongoose } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        trim:true,
        maxLength:[30,"your name must be less than 30 chars"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        trim:true,
        minLength:[6,"your password must be more than 6 chars"]
    },
    isOnline: {
        type: Boolean,
        default: false,
      },
    profilePicture:{
        type:String,
    },
changePasswordAt:Date,
},{timestamps:true})

userSchema.pre("save",function(){
    this.password = bcrypt.hashSync(this.password,7);
})

userSchema.pre("findOneAndUpdate",function(){
    this._update.password = bcrypt.hashSync(this._update.password ,7);
})



export const userModel = model('User', userSchema)
