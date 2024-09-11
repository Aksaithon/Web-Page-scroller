"use client";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const SideBar = () => {
  return (
    <div className=" flex gap-3 ">
      <Link
        className=" bg-slate-950 text-slate-200  p-2 rounded-md items-center justify-center "
        href={"/dashboard"}
      >
        Dashboard
      </Link>
      <Link
        className=" bg-slate-950 text-slate-200  p-2 rounded-md items-center justify-center "
        href={"/"}
      >
        Home
      </Link>

      <SignInButton>
        <Button className=" bg-blue-500 ">Sign in</Button>
      </SignInButton>
      <SignOutButton>
        <Button className="bg-red-500">Sign out</Button>
      </SignOutButton>
    </div>
  );
};

export default SideBar;
