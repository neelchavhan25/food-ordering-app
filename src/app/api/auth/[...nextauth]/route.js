import mongoose from "mongoose";
import {User} from '@/app/models/User'
import NextAuth from "next-auth"
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect"

export const authOptions={
  secret:process.env.SECRET, 
    adapter :MongoDBAdapter(clientPromise),

    providers:[
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Email", type: "email", placeholder: "test@example.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) { 
              const {email,password}=credentials;
              mongoose.connect(process.env.MONGO_URL);
              const user=await User.findOne({email});
              const passwordOk=user && bcrypt.compareSync(password,user.password);
              console.log({passwordOk});

              if(passwordOk){
                return user;
              }
              return null
            }
          })
    ]
  
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }