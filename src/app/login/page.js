'use client'

import { useRouter } from "next/navigation"
import React, { useState } from 'react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter();
  const HandleInput = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      console.log(response)

      const data = await response.json()
      console.log(data)

      if (!data.success) {
        setMessage(data.error || "Something went wrong")
      } else {
        setMessage("✅ " + data.message)
        router.push('/home')
      }
  }

  return (
    <>
      <div className="text-field">
        <div className="my-inputs">
          <h2>Welcome Back</h2><br />
          <input
            type='text'
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} /><br />
          <input
            type='password'
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} /><br />
          <button onClick={HandleInput}>Login</button>
          <br /><br />  
          <p>{message}</p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
