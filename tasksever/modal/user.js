import mongoose from "mongoose";
const userSchema= new mongoose.Schema(
    {
        firstname:{
            type:String,
            require:true
        },
        lastname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        isOwner:{
            type:Boolean,
            default:false
        },
    },
    {
        timestamps:true
    }
)

export default mongoose.model("User",userSchema)
