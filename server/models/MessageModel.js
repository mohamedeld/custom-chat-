const {Schema,model,models} = require("mongoose")

const messageModel = new Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
         type:String,
        default:""
    },
    videoUrl:{
         type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


const Message = models?.Message || model("message",messageModel);

module.exports = Message;