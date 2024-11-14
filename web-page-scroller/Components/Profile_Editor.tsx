import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import EditProfileForm from "./EditProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Profile_Editor = () => {
  const [showForm, setShowForm] = useState(false);
  const getUserData_from_store = useSelector((state: RootState) => state.user);

  const handleCloseDialog = () => {
    setTimeout(() => {
      setShowForm(false);
    }, 1100);
  };

  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogTrigger asChild>
        <span className="w-full" onClick={() => setShowForm(true)}>
          Edit profile
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm
          id={getUserData_from_store.id}
          username={getUserData_from_store.username}
          fullname={getUserData_from_store.fullName}
          email={getUserData_from_store.email}
          onCloseDialog={handleCloseDialog} // Pass the close handler to the form
        />
      </DialogContent>
    </Dialog>
  );
};

export default Profile_Editor;
