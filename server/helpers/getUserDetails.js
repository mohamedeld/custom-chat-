const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const getUserDetails = async (token)=>{
    if(!token){
        return {
            message:"signed out",
            logout:true
        }
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded?.id)?.select("-password");
    return user;
}




module.exports = getUserDetails;