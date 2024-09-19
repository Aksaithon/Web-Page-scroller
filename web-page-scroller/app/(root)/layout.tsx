import SideBar from "@/components/SideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col  w-screen  bg-slate-100 ">
      {children}
      <div className=" fixed top-[570px] ">
        <SideBar />
      </div>
    </div>
  );
}
