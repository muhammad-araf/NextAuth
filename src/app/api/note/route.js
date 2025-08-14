import { connect } from "@/dbconfig/dbConfig"
import Note from "@/models/noteModel"
import User from "@/models/useModel"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
//CREATE : FOR CRUD OPERATION IN API
//1st is create then read then update, then delete
//lets Create for BY POST
export const POST = async (request) => {
try {
        await connect()
        const {note} = await request.json()
        if(!note) {
            return NextResponse.json({message:"Input Not getting"} , {status:400})
        }
        const cookie = await cookies()
        const token = cookie.get("token")?.value || "";
        if(!token){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const existingUser = await User.findOne({ email: decoded.email });
        if(!existingUser){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        let existing_note = await Note.findOne({postedBy: existingUser._id})
        if(!existing_note){
            existing_note = Note.create({
                notes: [note],
                postedBy: existingUser._id,
            })
        }else{
            existing_note.notes.push(note)
            await existing_note.save()
        }
            return NextResponse.json(
            { message: "Note created successfully",success:true, note: existing_note },
            { status: 200 }
            )
} catch (error) {
    return NextResponse.json(
        {message:error.message},{status:400}
    )
}
}
export const GET = async () => {
    try {
        await connect()
        const token = cookies().get("token")?.value || "";
        if(!token){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const existingUser = await User.findOne({ email: decoded.email });
        if(!existingUser){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        const existing_note_user = await Note.findOne({postedBy: existingUser._id})
        if(!existing_note_user.notes){
            return NextResponse.json({message: "Note Empty"},{status : 400})
        }
            return NextResponse.json(
            { message: "Note Saved", note: existing_note_user.notes ,success:true},
            { status: 200 }
            )
} catch (error) {
    return NextResponse.json(
        {message:error.message},{status:400}
    )
}
}

export const PATCH = async (request) => {
    try {
        await connect()
        const {note,index} = await request.json();
        console.log(note)
        console.log(index)
        if(!note || index===undefined){
            return NextResponse.json({message: `Index and Note Not Defined` },{status:400})
        }
        const cookie = await cookies()
        const token =  cookie.get("token")?.value || "";
        if(!token){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const existingUser = await User.findOne({ email: decoded.email });
        if(!existingUser){
            return NextResponse.json({message : "User Unauthorized"} ,{status : 500})
        }
        
        const existing_note_user = await Note.findOne({postedBy: existingUser._id})
        existing_note_user.notes[Number(index)] = note
        await existing_note_user.save()
        return NextResponse.json({message:"Updated Success",success:true},{status : 200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status : 500})
    }
}
export const DELETE = async (request) => {
    try {
        await connect()
        let {index}  = await request.json()
        if(index===undefined){
            return NextResponse.json({message: "Index Not Defined..!"} , {status : 404})
        }
        const cookie = await cookies()
        const token = cookie.get("token")?.value || ""
        if(!token){
            return NextResponse.json({message:"User UnAuthorized"},{status : 401})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const existing_user = await User.findOne({email:decode.email})
        if(!existing_user){
            return NextResponse.json({message: "User UnAuthorized"},{status:401})
        }
        const existing_Note = await Note.findOne({postedBy: existing_user._id})
        if(!existing_Note){
            return NextResponse.json({message: "User UnAuthorized"},{status:401})
        }
        index = Number(index);
        if (index < 0 || index >= existing_Note.notes.length) {
            return NextResponse.json({ message: "Invalid index" }, { status: 404 });
        }

        existing_Note.notes.splice(Number(index),1)
        await existing_Note.save()
        return NextResponse.json({message:"Delete Successfully",success:true},{status:200})
    } catch (error) {
            return NextResponse.json({message: error.message},{status:500})
    }
}