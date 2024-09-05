"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// TODO: API is getting called again and again. Fix it!

const SaveUserToDatabase = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const saveUser = async () => {
      if (!user || !isLoaded) return;

      try {
        const response = await fetch("http://localhost:3000/api/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress ,
            name: `${user.fullName}`,
          }),
        });

        const thisUser = await response.json();
        if (thisUser.isNewUser) {
          router.replace(
            `/create-profile?userId=${thisUser.userId}&userFullName=${user.fullName}`
          );
        }

        if (!response.ok) {
          console.error("Failed to save user:", await response.json());
        } else {
          console.log("User saved to the database");
        }
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };

    saveUser();
  }, [user, isLoaded]);

  return null;
};

export default SaveUserToDatabase;
