"use client";
import SignUpForm from "components/SignUpForm";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateProfile = () => {
  const [nameRequire, setNameRequire] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const userFullName = searchParams.get("userFullName");
  
  useEffect(() => {
    if (userFullName === "undefined"  || userFullName === 'null' || userFullName === '') {
      setNameRequire(true);
    }
  }, [userFullName]);

  return <SignUpForm id={id} nameFieldRequire={nameRequire} />;
};

export default CreateProfile;
