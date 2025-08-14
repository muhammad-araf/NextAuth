'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OtpInput from 'react-otp-input';

const Page = () => {
    const router = useRouter()
    const [count,setCount] = useState(30)
    const [email, setEmail] = useState('');
    const [OTP,setOtp] = useState('')
    useEffect(()=>{
        OTP.toString().length===6? HandleInput() : null
    },[OTP])
    useEffect(()=>{
        const getEmail = async ()=>{
            const get = await fetch("api/auth/email")
            const response = await get.json()
            setEmail(response)
        }
        getEmail()
        setCount(30)
        
    },[])
    if(count>0 && count<=30){
                setTimeout(()=>{
                    setCount(count-1)
                },1700)
    }

const HandleInput = async () => {
    const loadingToast = toast.loading("Verifying OTP...");

    try {
        const response = await fetch(`/api/auth/verify`, {
            method: 'POST',
            body: JSON.stringify({ email : email.email, OTP }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await response.json();
        console.log(res);

        if ( res.success) {
            router.push("/login")
            toast.success(res.message || "User Verified Successfully", { id: loadingToast });
        } else {
            toast.error(res.error || res.message || "Verification failed", { id: loadingToast });
        }
    } catch (error) {
        console.error(error);
        toast.error("Internal Server Error. Please try again later.", { id: loadingToast });
    }
};

    const reSendEmail = async () => {
        setCount(30)
        const response = await fetch("api/auth/resend",{
            method : "POST",
            body:JSON.stringify({email : email.email})
        })
        const res = await response.json()
        if (res.success) {
            toast.success("Email Re-Send Success")
        }
        
    }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-transparent font-serif ">
        <div className="my-inputs border-1 border-blue-500/30 pb-15 pt-6 w-100 rounded-lg backdrop-blur-lg ">
          <h2 className="text-2xl text-gray-200 text-center mb-6 mt-10 ">Verify your email</h2>

    <div className="flex justify-center ">
        <OtpInput
        value={OTP}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>{"- - "}</span>}
        renderInput={(props) => (
            <input
            {...props}
            className="bg-black text-white !w-12 h-18 text-center rounded-md border border-blue-400 focus:outline-none text-xl"
            />
        )}
        />
    </div>
        <div className="flex justify-center text-white mt-6">{email.email}</div>
          <div className="flex justify-center">
            <button
              onClick={HandleInput}
              className="p-1 mt-4 w-[95%] bg-transparent border-1 border-gray-500/20 rounded-sm text-l text-white cursor-pointer hover:bg-gray-500/10"
            >
              Verify
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <p className="text-white text-sm ">
                {
                    count===0?(
                        
                        <button className="text-white/70 cursor-pointer hover:bg-gray-500/10 transition rounded-lg p-1"
                        onClick={reSendEmail}
                        >Resend Email</button>
                    ):(
                        <>
                         You can Resend email in <span className="text-l text-blue-200">{count}</span>
                         </>
                    )
                }
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
