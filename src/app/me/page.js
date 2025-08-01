'use client'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
  useEffect(() => {
    toast.success("hell")
  }, [])

  return (
    <div>page</div>
  )
}

export default Page
