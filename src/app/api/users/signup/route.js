import User from "@/models/useModel";
import { connect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";






export async function POST(request){
    connect()
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        // const user = await User.findOne({email})

        // if(user){
        //     return NextResponse.json({error: "User already exists"}, {status: 400})
        // }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        const etype = "VERIFY";

        const mailresponse = await sendEmail(email,etype,savedUser._id)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        console.log(mailresponse)
        return NextResponse.json({result : "ALl Success" ,mail : mailresponse})
        
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400})

    }
}
export const GET = () => {
    return NextResponse.json({Result : "Success"})
}
