"use client";
import { usePathname } from "next/navigation";

export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();
  const showBackground = pathname.startsWith("/signup");
  const isLogin = pathname.startsWith("/login");
  const isVerify = pathname.startsWith("/verify");
  const color = "#0a1f44"
  return (
        <div className="relative min-h-screen text-[#0f0f0f]">
        {/* {showBackground && (
            <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-110"
            style={{ backgroundImage: "url('/assets/images/authbg.jpg')" }}
            />
        )}
        {isLogin && (
            <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-110"
            style={{ backgroundImage: "url('/assets/images/authbg.jpg')" }}
            />
        )}
        {isVerify&&(
            <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-110"
            style={{ backgroundImage: "url('/assets/images/authbg.jpg')" }}
            />
        )} */}
        <div
        className="absolute inset-0 "
        style={{
            background: "linear-gradient(135deg, #0f0f0f, #1a1a1a,  #1f1b3a)",
        }}
        />

        <div className="relative z-10">{children}</div>
        </div>
  );
}
