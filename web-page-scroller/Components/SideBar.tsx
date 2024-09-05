'use client'
// import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SideBar = () => {
  const router = useRouter();

  const navigate = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <button onClick={navigate}> Dashboard </button>
    </div>
  );
};

export default SideBar;
