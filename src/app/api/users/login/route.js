import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
export async function POST(request){
    await connect()
    const {username,password} = await request.json()
    const user = await User.findOne({username});
    console.log(user)
    if(!user){
        
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const check_password = await bcryptjs.compare(password,user.password);
    if(!check_password){
        return NextResponse.json({ error: "Invalid Password" }, { status: 404 })
    }
    return NextResponse.json({
    message: "Login Successfully",
    success: true
    }
);

}