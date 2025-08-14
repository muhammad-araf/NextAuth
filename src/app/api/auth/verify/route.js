import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/useModel";
export async function POST(request){
    try {
        
    await connect()
    const {email,OTP} = await request.json()
    console.log(email+" "+OTP)
    if(!email || !OTP) {return NextResponse.json({error:"Invalid"},{status:404})}
    const user = await User.findOne({email});
    console.log(user)
    if(!user){
        return NextResponse.json({error:"Invalid User"},{status:404})
    }
    if(user.isVerified){
        return NextResponse.json({error:"User Already Verified"},{status:404})
    }
    if(
        Number(user.verifyOTP) !== Number(OTP)
    ){
        return NextResponse.json({error:"OTP Invalid"},{status:404})
    }
        user.isVerified=true;
        user.verifyOTP=0;
        user.verifyOTPExpiry=0;
        await user.save()
        try {
            const response = NextResponse.json(
                {
                success : true,
                message:"User Verified Success"
                },{
                    status : 200
                }
            )
            response.cookies.set("signupEmail","",{
                    httpOnly:true,
                    expires : new Date(0)
            })
            return response
                
        } catch (error) {
            return NextResponse.json({success:false,message:error.message},{status : 500})
        }
    } catch (error) {
        return NextResponse.json({success:false,message:"Internal Server Error"},{status : 500})
    }
}