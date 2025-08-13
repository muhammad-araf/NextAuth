'use client'
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()

  return (
    <div >
      <main>

        <h4>This is NEXTAUTH <b>Home Page</b></h4>
        <div className="">
        <button onClick={()=>router.push('/login')}>Login</button> <button onClick={()=>router.push('/signup')}>Register</button>
        </div>
        </main>


    </div>
  );
}
export default Page
