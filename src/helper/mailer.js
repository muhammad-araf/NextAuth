import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/useModel';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Send Email Function
export const sendEmail = async (email, userID) => {
    await connect();

    // Generate 6-digit OTP
    const array = new Uint32Array(1);
    crypto.webcrypto.getRandomValues(array);
    const OTP = (array[0] % 900000) + 100000;

    // Save OTP in database
    await User.findByIdAndUpdate(
        userID,
        {
            verifyOTP: OTP,
            verifyOTPExpiry: Date.now() + 3 * 60 * 1000 // 3 minutes
        },
        { new: true }
    );

    const updatedUser = await User.findById(userID);
    console.log("Updated User:", updatedUser);

    try {
        // Create transporter
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465
            auth: {
                user: process.env.smtp_email,
                pass: process.env.smtp_password
            }
        });

        // Email content
        const mailOption = {
            from: 'arafmuhammad2008@gmail.com',
            to: email,
            subject: "SKILLSYNC - Verify Your Email Address",
            html: `
                <p>
                    Hi,<br/>
                    Your One-Time Password (OTP) is: 
                    <strong id="otp">${OTP}</strong><br>
                    This OTP is valid for 3 minutes.<br>
                    If the button doesn't work, manually copy the OTP above.
                </p>
            `
        };

        // Send email
        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse;

    } catch (error) {
        throw new Error("Something Went Wrong in Email Section: " + error.message);
    }
};
