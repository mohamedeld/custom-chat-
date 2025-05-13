const getUserDetails = require("../helpers/getUserDetails");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password,profilePic} = req.body;
    const checkEmail = await User.findOne({email});
    if(checkEmail){
        return next(new AppError("Email is already used",400))
    }
    const newUser = await User.create({
        name,
        email,password,profilePic
    });
    res.status(201).json({
        user:newUser,
    })
})


const loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError("Email is not found",404))
    }
    const checkPassword = await bcrypt.compare(password,user?.password);
    if(!checkPassword){
        return next(new AppError("Email or password is incorrect",400))
    }
    const token = jwt.sign({id:user?._id},process.env.JWT_SECRET_KEY,{
        expiresIn:'90d'
    })
    res.cookie("token",token,{
        http:true,
        secure:true
    }).status(200).json({
        user,
        token
    })
})


const userDetails = asyncHandler(async (req,res)=>{
    const token = req.cookies?.token || "";
    const user = await getUserDetails(token);
    if(!user){
        return next(new AppError("user is not found",404));
    }
    res.status(200).json({
        user
    })

})

const updateUser = asyncHandler(async (req,res)=>{
    const token = req.cookies?.token || "";
    const user = await getUserDetails(token);
    if(!user){
        return next(new AppError("user is not found",404));
    }

    const updateUser = await User.findByIdAndUpdate(user?._id,req.body,{new:true})
    res.status(200).json({
        user:updateUser
    })
})

const logout = asyncHandler(async (req,res)=>{
    return res.cookies('token','',{
        secure:true,
        htt:true
    }).status(200).json({
        message:"Session out"
    })
})

module.exports = {
    registerUser,
    loginUser,
    userDetails,
    logout,
    updateUser
}