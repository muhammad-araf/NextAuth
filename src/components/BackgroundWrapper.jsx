"use client";
import { usePathname } from "next/navigation";

export default function BackgroundWrapper({ children }) {
  const pathname = usePathname();
  const showBackground = pathname.startsWith("/signup");
  const isLogin = pathname.startsWith("/login");
  const isVerify = pathname.startsWith("/verify");
  return (
        <div className="relative min-h-screen">
        {showBackground && (
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
        )}
        <div className="relative z-10">{children}</div>
        </div>
  );
}
