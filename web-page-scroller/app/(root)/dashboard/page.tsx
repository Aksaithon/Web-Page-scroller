"use client";
import EditProfileForm from "@/components/EditProfileForm";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

interface myUser {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface myUserData {
  user: myUser;
}

const Dashboard = () => {
  const [name, setName] = useState<string | null | undefined>("");

  const [thisUser, setThisUser] = useState<myUserData>();

  const { user, isLoaded } = useUser();

  useEffect(() => {
    const getUserData = async () => {
      const id = user?.primaryEmailAddress?.emailAddress;

      const res = await fetch(`http://localhost:3000/api/formData/${id}`);

      const data = await res.json();

      const userData = data.userAllData;

      setThisUser({
        user: {
          id: userData?._id,
          email: userData?.email,
          name: userData?.name,
          username: userData?.username,
        },
      });
    };

    if (user && isLoaded) {
      getUserData();
      setName(user?.fullName);
    }
  }, [user, isLoaded]);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>Dashboard(profile) -&gt; analytics</div>

      <p>id = {thisUser?.user.id}</p>
      <p>email = {thisUser?.user.email}</p>
      <p>name = {thisUser?.user.name}</p>
      <p>username = {thisUser?.user.username}</p>

      <Button onClick={() => setShowForm(!showForm)}>Edit profile</Button>

      {showForm && (
        <EditProfileForm
          id={thisUser?.user.id}
          username={thisUser?.user.username}
          fullname={thisUser?.user.name}
          email={thisUser?.user.email}
        />
      )}
    </>
  );
};

export default Dashboard;
