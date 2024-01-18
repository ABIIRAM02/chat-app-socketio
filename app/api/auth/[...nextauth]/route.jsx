
import User from "@/model/user"
import { connectToDB } from "@/utils/database"
import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async signIn({ profile }) {

            try {
                connectToDB()

            const userExist = await User.findOne({
                email:profile.email
            })

            if(!userExist){
                    await User.create({
                    name :profile.name,
                    email:profile.email,
                    image:profile.picture
                })
            }
            
            return true

            } catch (error) {
                console.log(error);
            }
            
          }
      }
})

export { handler as GET , handler as POST }