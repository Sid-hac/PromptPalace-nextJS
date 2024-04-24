
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/users";
// import Nextauth from "../[...nextauth]";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
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
              
            console.log(profile);
              
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