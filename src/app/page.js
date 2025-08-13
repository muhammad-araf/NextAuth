'use client'
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const Page = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#1f1b3a] text-white">
      <header className="fixed top-0 left-0 w-full flex items-center justify-center px-6 py-4  ">
        <nav className="flex items-center justify-between w-full max-w-7xl bg-gray-600/20 pl-7 pr-7 pt-2 pb-2 rounded-lg backdrop-blur-lg z-50 shadow-lg">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-purple-400 flex justify-between cursor-pointer" onClick={()=>router.push("/")} >
            <Image src={"/assets/images/image.png"} width={30} height={25} className="text-white bg-transparent mr-3"/>
            Note App
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition duration-500"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600 transition duration-500"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-6 text-center mt-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            Your <span className="text-purple-400">Private Notes</span>,
            Safe & Secure
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            A full-stack note-taking web app built with Next.js Create, Read, Update, and Delete your personal notes with privacy.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-lg font-semibold transition duration-300 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-black/5 text-gray-500 text-center py-4 text-sm">
        © 2025 Note Web App. All Rights Reserved.
      </footer>
    </div>
  )
}

export default Page
