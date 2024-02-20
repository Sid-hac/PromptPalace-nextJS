
import { connectToDB } from "@utils/database";
import nextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/users";

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_ID,
            clientSecret: process.env.NEXT_GOOGLE_SECRET
        })
    ],

    callbacks: {
    
          async session({session}) {
             
            const sessionUser = await User.findOne({
                email: session.user.email 
               }).wtimeout(20000);

             session.user.id = sessionUser._id.toString();

             return session;
           },

           async signIn({profile}){
              
              try {
                await connectToDB();
                //user already exists
                console.log("db already exists");

                const userExists = await User.findOne({
                    email: profile.email
                }).wtimeout(20000);

                //if not , then create
                if(!userExists) {
               
                     await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", ""),
                        image: profile.picture
                     })              
                }

                return true;
              } catch (error) {
                 console.log(error); 
              }
           }

          }
    
})

export {handler as GET , handler as POST};