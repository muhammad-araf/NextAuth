import mongoose from "mongoose"

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        
        const connection = mongoose.connection
        connection.on('connect',()=>{
            console.log("DB connected");
        })
        connection.on('error',(err)=>{
            console.log("DB cannot connect"+err);
            process.exit();
        })

    } catch (error) {
        console.log("Error In mongoDB connection :"+error);
    }
}