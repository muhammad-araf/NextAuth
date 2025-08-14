'use client'
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
const Page = () => {
  const [editIndex, setEditIndex] = useState(null);
    const [editValue , setEditValue] = useState();
    const [data,setData] = useState([])
  const router = useRouter()
      const getData = async () => {
        try {
        let response = await axios.get("/api/note")
        console.log(response)
            if(response.data.success){
                setData(response.data.note)
            }else{
                toast.error(response.data.message||response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  useEffect(()=>{

    getData()
  },[])
  const handleDelete = async (index) => {
    let response = await axios.delete("/api/note",{
        data:{index}
    })
    if(response.data.success){
        toast.success("Deleted Success")
        getData()
    }else{
        toast.error("Not Deleted")
        getData()
    }
  }
  const handleUpdate = async (index,note) => {
    let response = await axios.patch("/api/note",{
        note:note,
        index:index
        
    })
    getData()
    if(response.data.success){
        toast.success("Edit Success")
    }else{
        toast.error("Not Edit")
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
              href="/new"
              className="px-4 py-2 rounded-md border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition duration-500"
            >
              New ✏️
            </Link>
          </div>
        </nav>
      </header>

<main className="flex-grow flex flex-col items-center justify-center px-6 mt-20 text-center">
 
      <>
        <div className="bg-gray-500/10 w-[80%] lg:w-[40%] rounded-xl p-4 shadow-md h-auto">
            {
                data.length!==0?(
             data.map((item,i)=>(
                <div className="flex justify-between " key={i}>
                {editIndex===i?(
                <input
                    className="p-1 px-3 rounded-lg border border-gray-300 focus:outline-none"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => {
                    handleUpdate(i, editValue);
                    setEditIndex(null);
                }}
                autoFocus
                />
                ):(
                        <p className="hover:bg-gray-500/10 p-1 px-3 rounded-lg cursor-pointer"
                        onClick={()=>{
                            setEditIndex(i);
                            setEditValue(item);
                        }}
                        >
                        {item}
                        </p>
                )}
                <div>
                {/* <button className="mr-2 hover:bg-gray-500/10 p-1 rounded-lg cursor-pointer">✏️</button> */}
                <button className="hover:bg-gray-500/10 p-1 rounded-lg cursor-pointer"
                onClick={()=>handleDelete(i)}
                >🗑</button>
                </div>
            </div>
             ))):(
                <div className="flex justify-between">
                <p>No Note Saved</p>
                <div>
                </div>
            </div>
             )
            }
        </div>
  </>
</main>


    </div>
  )
}

export default Page
