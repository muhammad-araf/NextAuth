import { connect } from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/useModel";
import bcrypt from "bcryptjs";
import {NextResponse } from "next/server"
export const POST = async (request) => {
    await connect();
    const reqBody = await request.json();
    const {email,username,password} = reqBody;
    const existing_user = await User.findOne({username});
    if(existing_user){
        return NextResponse.json({success : "fail",message: "User Already Exist"});
    }
    const Hash_Password = await bcrypt.hash(password,10);

    const newUser = await User.create({
        username,
        email,
        password : Hash_Password
    })
        await sendEmail(email,newUser.id);
    return NextResponse.json({success:true,message : "User Created Success",user : newUser});
}