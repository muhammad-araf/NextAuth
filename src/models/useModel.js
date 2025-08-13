    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique:true },
        password: { type: String, required: true },
        isVerified : {
            type : Boolean,
            default : false
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        forgetPasswordOTP : Number,
        forgetPasswordOTPExpiry : Date,
        verifyOTP: {
            type : Number,
            default : 0
        },
        verifyOTPExpiry :{
            type : Date,
            default : 0
        }
    },
    { timestamps: true }
    );

if (process.env.NODE_ENV !== "production" && mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;