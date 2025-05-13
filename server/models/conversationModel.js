const {Schema,model,models} = require("mongoose")

const conversationModel = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,"sender is required"]
    },
    receiver:{
         type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,"receiver is required"]
    },
    messages:[{
        type:Schema.Types.ObjectId,
        ref:'Message',
        required:[true,"Password is required"]
    }]
},{timestamps:true});


const Conversation = models?.Conversation || model("Conversation",conversationModel);

module.exports = Conversation;