import User from "@/model/user"
import { connectToDB } from "@/utils/database"


export const GET = async ( req , res ) => {

    try {

        await connectToDB()
        const users = await User.find({})
        return new Response(JSON.stringify(users), { status: 200 })

    } catch (error) {
        return new Response('failed to get users', { status: 500 })
    }

}