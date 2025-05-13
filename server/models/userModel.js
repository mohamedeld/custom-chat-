const {Schema,model,models} = require("mongoose")
const bcrypt = require("bcryptjs");
const userModel = new Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

userModel.pre('save',async function(next){
    try{
        if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
    }catch(error){
        next(error);
    }
})
const User = models?.User || model("User",userModel);

module.exports = User;