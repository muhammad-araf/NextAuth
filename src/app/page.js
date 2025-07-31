'use client'
import styles from "./page.module.css";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <h4>This is <code>NEXTAUTH</code> <b>Home Page</b></h4>
        <div className="homepage-btn">
        <button onClick={()=>router.push('/login')}>Login</button> <button onClick={()=>router.push('/signup')}>Register</button>
        </div>
        </main>


    </div>
  );
}
