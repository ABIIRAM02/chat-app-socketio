import { Schema , model , models } from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:[true , 'username is required']
    },
    email:{
        type:String,
        required:[true , 'email is required']
    },
    image:{
        type:String,
    }
})

const User = models.user || model('user' , userSchema)

export default User