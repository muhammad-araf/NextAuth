import User from "@/models/useModel";
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import { cookies } from "next/headers";
export async function POST(request){
    await connect()
    const {username,password} = await request.json()
    const user = await User.findOne({username});
    console.log(user)
    if(!user){
        return NextResponse.json({ error: "Invalid Crendentials" }, { status: 404 })
    }
    const check_password = await bcryptjs.compare(password,user.password);
    if(!check_password){
        return NextResponse.json({ error: "Invalid Password" }, { status: 404 })
    }
    if(!user.isVerified){
        return NextResponse.json({error:"User Not Verified"},{status : 404})
    }
    const token = jwt.sign({
            id:user._id,
            email:user.email,
            username:user.email
        },process.env.JWT_SECRET,{expiresIn:"10d"}
    )
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60, // 10 days
        path: "/",
        });
    return NextResponse.json({
    message: "Login Successfully",
    success: true
    }
);

}