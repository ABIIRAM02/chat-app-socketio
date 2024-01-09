const { Schema, model, models } = require("mongoose");

const messageSchema = new Schema({
    message:{
        type:String,
        required:[true , `msg can't be empty`]
    },
    email:{
        type:String,
        required:[true , `email can't be empty`]
    },
    name:{
        type:String,
        required:[true , `name can't be empty`]
    },
    time:{
        type:String,
        required:[true , `time can't be empty`]
    },
})

const Message = models.message || model('message' , messageSchema)

export default Message