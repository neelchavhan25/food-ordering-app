import mongoose from "mongoose";
import {User} from "../../models/User"
import bcrypt from "bcrypt"

export async function POST(req){
    const body=await req.json();
    mongoose.connect(
        process.env.MONGO_URL
      )
      .then(()=>console.log('connected'))
      .catch(e=>console.log(e));

    const pass=body.password;  
      if(!pass.length || pass.length < 5){
        new Error('password must be at least 5 character');
      }

 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);

  body.password=hashedPassword;

    const userCreated=await User.create(body);
    return Response.json(userCreated);
}