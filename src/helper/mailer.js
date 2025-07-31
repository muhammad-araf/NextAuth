import User from '@/models/useModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'
export const sendEmail = async (email,emailType,userID) =>{
    const HashToken = await bcryptjs.hash(userID.toString(),10)
    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userID,
            {verifyToken : HashToken,
            verifyTokenExpiry:Date.now()+600000} // 10 min plus of currect time
        )
    }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userID,
            {forgetPasswordToken : HashToken,
            forgetPasswordTokenExpiry:Date.now()+600000} // 10 min plus of currect time
        )
    }
    try {
        const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: `${process.env.smtp_email}`,
    pass: `${process.env.smtp_password}`
  }
    });
    const mailOption = {
    from: 'arafmuhammad2008@gmail.com',
    to: email,
    subject: emailType==="VERIFY"? "VERIFY YOUR EMAIL ADDRESS" : "RESET YOUR PASSWORD",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${HashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${HashToken}
            </p>`,
    }
    const mailResponse = await transport.sendMail(mailOption);
    console.log(mailResponse)
    return mailResponse;
        
    } catch (error) {
        throw new Error("Something Wen Wrong in Email Section :"+error.message)
    }
}