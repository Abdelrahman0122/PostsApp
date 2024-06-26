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
    posts: [{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }],
    friends: [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    friendRequests: [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    about:{
        type:String,
        trim:true,
        maxLength:[100,"your about must be less than 100 chars"]
    },
    interests:[{
        type:String,
    }],
    education:{
        type:String,
    },
changePasswordAt:Date,
forgetPasswordToken:String,
},{timestamps:true})

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 7);
    next();
  });

  userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 7)
});


export const userModel = model('User', userSchema)
