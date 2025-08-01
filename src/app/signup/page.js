'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const page = () => {

    const [username,setUsername] = useState('')
    const router = useRouter()
    const [email,setEmail] = useState('')   
    const [password,setPassword] = useState('')
    const[show,setShow] = useState(false);
    const[load,setLoad] = useState(false)
    const HandleInput = async () => {
        setLoad(true)
        let response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/signup`,{
            method : 'POST',
            body : JSON.stringify({username,email,password})
        })
        response = await response.json()
        if(response.success){
            setLoad(false)
            alert("Your Account has been created now login");
            setShow(true)
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        }
        
        
    }
  return (
    <>
    <div className="text-field">
        <div className="my-inputs">
        <h2>Register Here</h2><br/>
    <input type='text' name='username' placeholder="Enter Your Username" value={username} onChange={(e)=>setUsername(e.target.value)} /><br/>
    <input type='email' name='email'placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
    <input type='password' name='password' placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
    <button onClick={HandleInput}>Register</button>
    <br/><br/>
    <p>Already has an Account? <Link className="myLink" href={'/login'}>Login</Link></p>
    <br/>
    {
        show?<p>
            Please <b>verify your email</b><br/> within 10 minutes.<br/>
            Please check your <strong>Inbox</strong> and <strong>Spam folder</strong><br/><br/>
            <h3>Redirecting to login page....</h3>
            </p>:null
            

    }
    {
        
        load?<div className="loader"></div> : null
        
    }
    </div>
    </div>
    
    </>
  )
}

export default page