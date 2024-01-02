import { Schema , model , models } from "mongoose";

const activeUsersSchema = new Schema({
    name:{
        type:String,
        required:[true , 'username is required']
    },
    email:{
        type:String,
        required:[true , 'userEmail is required']
    }
})

const ActiveUsers = models.activeUsers || model('activeUsers' , activeUsersSchema)

export default ActiveUsers