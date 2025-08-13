'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Page = () => {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm,setConfirm] = useState('')
    const HandleInput = async () => {
        if(password != confirm) {
            toast.error("Password do not confirm")
            return
        }
        toast.promise(
        fetch(`/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) throw new Error("Signup failed");
                let response = await fetch("api/auth/email",{
                method:"POST",
                body : JSON.stringify({email})
                })
                response = await response.json();
                if(response.success){
                    router.push('/verify');
                }
                const data = await res.json();

            return data;
        }),
        {
            loading: 'Creating account...',
            success: 'Account created successfully!',
            error: 'Error creating account.'
        }
        );
    };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-transparent font-serif ">
        <div className="my-inputs border-b-5 border-t-5 border-purple-400/60 pb-15 pt-6 w-100 rounded-lg backdrop-blur-lg ">
          <h2 className="text-2xl text-gray-200 text-center mb-6 mt-10 font-bold">Create an Account</h2>

          <div className="flex justify-center ">  
            <div className="flex items-center border-b-2 border-gray-300 rounded-lg p-0 w-[95%] ">
              <span className="bg-transparent p-2">
                <FaUser className="text-purple-400" />
              </span>
              <input
                type='text'
                name='username'
                className="m-1 rounded-lg text-white text-l h-10 w-[90%] pl-1 border-none focus:outline-none"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="flex items-center border-b-2 border-gray-300 rounded-lg p-0 w-[95%] mt-4">
              <span className="bg-transparent p-2 ">
                <FaEnvelope className="text-purple-400" />
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
            <div className="flex items-center border-b-2 border-gray-300 rounded-lg p-0 w-[95%] ">
              <span className="bg-transparent p-2 ">
                <FaLock className="text-purple-400" />
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

          <div className="flex justify-center mt-4">
            <div className="flex items-center border-b-2 border-gray-300 rounded-lg p-0 w-[95%] ">
              <span className="bg-transparent p-2 ">
                <FaLock className="text-purple-400" />
              </span>
              <input
                type='password'
                name='confirmPassword'
                value={confirm}
                className="m-1 rounded-lg text-white text-l h-10 w-[90%] pl-1 border-none focus:outline-none"
                placeholder="Confirm Password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={HandleInput}
              className="p-1 mt-10 w-[95%] bg-transparent border-1 border-gray-500/20 rounded-sm  text-lg text-purple-200 cursor-pointer hover:bg-gray-500/10 hover:text-white transition duration-150"
            >
              Signup
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-white text-sm ">
              Already have an account?{" "}
              <Link className="text-purple-400/60 hover:text-purple-400 transition duration-300" href={'/login'}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
