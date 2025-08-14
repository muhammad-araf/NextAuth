import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export  const POST = async (request) => {
    const {email} = await request.json()
    ;(await cookies()).set("signupEmail",email,{
        httpOnly:true,
        secure:true,
        path: "/"
    })
    return NextResponse.json({success:true})
}
export const GET = async () => {
        const email = await cookies().get("signupEmail")?.value;
        return NextResponse.json({email});
}