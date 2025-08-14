'use client'
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
const Page = () => {
  const [show,setShow] = useState(false)
  const [note,setNote] = useState("")
  const router = useRouter()
  const handleNote = async () => {
    setShow(false)
    try {
      let response = await axios.post("/api/note",{note})
      // response = await response.json()
      console.log(response)
      if(response.data.success){
      toast.success(response.data.message)
      }else{
        toast.error(response.data.message||response.data.error)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#1f1b3a] text-white">
      <header className="fixed top-0 left-0 w-full flex items-center justify-center px-6 py-4  ">
        <nav className="flex items-center justify-between w-full max-w-7xl bg-gray-600/20 pl-7 pr-7 pt-2 pb-2 rounded-lg backdrop-blur-lg z-50 shadow-lg">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-purple-400 flex justify-between cursor-pointer" onClick={()=>router.push("/")} >
            <Image src={"/assets/images/image.png"} width={30} height={25} alt="Logo" className="text-white bg-transparent mr-3"/>
            Note App
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/notes"
              className="px-4 py-2 rounded-md border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition duration-500"
            >
              My Notes
            </Link>
          </div>
        </nav>
      </header>

<main className="flex-grow flex flex-col items-center justify-center px-6 mt-20 text-center">
  {
    show?(
      <>
      <div className="bg-gray-500/10 w-[80%] lg:w-[40%] rounded-xl p-4 shadow-md h-auto">
    <textarea
      className=" w-full h-[30vh] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none bg-gray-500/10"
      placeholder="Write your notes here"
      onChange={(e)=>setNote(e.target.value)}
    />
  </div>
  <button className="mt-6 px-6 py-2 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
      onClick={handleNote}>
    Save 🗁
  </button>
  </>
    ):
      <button className="mt-6 px-6 py-2 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300 cursor-pointer"
      onClick={()=>setShow(true)}>
    New {" "} ✏️
  </button>
  }
  
</main>

    </div>
  )
}

export default Page
