import { connect } from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/useModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connect()
        const {email} = await request.json();
        if(!email){
            return NextResponse.json({success:false,message:"Email Not Getting"})
        }
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({success: false, message:"User Does not exist"})
        }
        const id = user.id
        const EmailResponse = await sendEmail(email,id);
        return NextResponse.json({success:true,message : "Email Send Success",response:EmailResponse})
    } catch (error) {
        return NextResponse.json({success:false,message:"Internal Server Error",error:error.message},{status:500})
    }
}