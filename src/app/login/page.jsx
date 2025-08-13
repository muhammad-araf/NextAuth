'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {  FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleInput = async () => {
        toast.promise(
        fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({  email, password }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.success) throw new Error("Signup failed");
            const data = await res.json();
            // router.push('/verify');
            return data;
        }),
        {
            loading: 'Loging...',
            success: 'Login Success!',
            error: "Error When Login"
        }
        );
    };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-transparent font-serif ">
        <div className="my-inputs border-2 border-blue-500/30 pb-15 pt-6 w-100 rounded-lg backdrop-blur-lg ">
          <h2 className="text-2xl text-gray-200 text-center mb-6 mt-10 ">Welcome Back,</h2>


          <div className="flex justify-center ">
            <div className="flex items-center border-b-2 border-blue-400 rounded-lg p-0 w-[95%] mt-4">
              <span className="bg-transparent p-2 ">
                <FaEnvelope className="text-blue-500" />
              </span>
              <input
                type='email'
                name='email'
                className="m-1 rounded-lg text-white text-l h-10 w-[90%] pl-1 border-none focus:outline-none"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center border-b-2 border-blue-400 rounded-lg p-0 w-[95%] ">
              <span className="bg-transparent p-2 ">
                <FaLock className="text-blue-500" />
              </span>
              <input
                type='password'
                name='password'
                className="m-1 rounded-lg text-white text-l h-10 w-[90%] pl-1 border-none focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={HandleInput}
              className="p-1 mt-10 w-[95%] bg-transparent border-1 border-gray-500/20 rounded-sm text-l text-white cursor-pointer hover:bg-gray-500/10"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-white text-sm ">
              Do not have an account?{" "}
              <Link className="text-blue-400 hover:underline" href={'/signup'}>
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
