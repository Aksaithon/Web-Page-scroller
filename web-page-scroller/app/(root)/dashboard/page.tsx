"use client";
import Card from "@/components/Card";
import EditProfileForm from "@/components/EditProfileForm";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CheckCircle2Icon,
  CheckIcon,
  CircleCheck,
  Loader2,
  LucideCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CardObserver from "@/components/CardObserver";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUserData,
  setUserData,
} from "@/lib/features/addUserData/userDataSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { addUserPosts } from "@/lib/features/addUserPosts/userPostSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface myUser {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface myUserData {
  user: myUser;
}

interface TextData {
  _id: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Dashboard = () => {
  const { user, isLoaded } = useUser(); // clerk
  const [showForm, setShowForm] = useState(false);
  const [addText, setAddText] = useState(false);
  const cardRef = useRef();

  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string>();

  const [pageNo, setPageNo] = useState(1);
  const [isAddingText, setIsAddingText] = useState<boolean | null>(null);
  const [textSubmitted, setTextSubmitted] = useState<boolean | null>(null);

  // DISPACH userData to redux-store
  const dispatchUser = useDispatch();

  // DISPACH userPost data to redux-store
  const dispatchPosts = useDispatch<AppDispatch>();

  // RETRIEVE userData from redux-store
  const getUserData_from_store = useSelector((state: RootState) => state.user);

  // RETRIEVE userPosts from redux-store
  const getUserPosts = useSelector((state: RootState) => state.userPosts.posts);

  const router = useRouter();

  const formSchema = z.object({
    text: z.string(),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAddingText(true);

    setTimeout(async () => {
      const res = await fetch(`http://localhost:3000/api/appData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: getUserData_from_store.id, // Pass the logged-in user's DB ID
          username: getUserData_from_store.username,
          text: values.text,
          tags: values.tags.split(","), // Split tags by commas into an array
        }),
      });

      if (res.ok) {
        setIsAddingText(false);
        setTextSubmitted(true);
        setText(""); // Reset form after submission
        setTags("");
      } else {
        setTextSubmitted(false);
      }

      location.reload();
    }, 1100);
  }

  // get current user data
  useEffect(() => {
    const getUserData = async () => {
      const id = user?.primaryEmailAddress?.emailAddress;

      const res = await fetch(`http://localhost:3000/api/formData/${id}`);

      const data = await res.json();

      const userData = data.userAllData;

      dispatchUser(
        setUserData({
          id: userData?._id,
          fullName: userData?.name,
          email: userData?.email,
          username: userData?.username,
        })
      );
    };

    if (user && isLoaded) {
      if (getUserData_from_store.id) {
        console.log("Got data from redux-store");
      } else {
        getUserData();
        console.log("Got data from Database");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoaded, dispatchUser]);

  //  get current user's all text posts from the database
  useEffect(() => {
    const getUserAllTexts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/userData?userId=${getUserData_from_store.id}&page=${pageNo}`,
        {
          cache: "no-cache",
        }
      );

      const data = await res.json();

      // console.log(data.textData, getUserData_from_store?.user.id);

      if (getUserPosts.length < data.totalPosts) {
        if (data.postData.length > 0) {
          dispatchPosts(addUserPosts(data.postData));
        }
      }
    };

    if (getUserData_from_store) {
      if (getUserPosts.length < pageNo * 5 || getUserPosts.length === 0) {
        getUserAllTexts();
        console.log("Got all posts from Database");
      } else {
        console.log("Got all posts from redux-store", getUserPosts.length);
      }
    }
  }, [dispatchPosts, getUserPosts, pageNo, getUserData_from_store]);

  return (
    <>
      <div className=" bg-slate-100 flex flex-col gap-3 items-center scrollbar-thin ">
        <p>id = {getUserData_from_store.id}</p>
        <p>email = {getUserData_from_store.email}</p>
        <p>name = {getUserData_from_store.fullName}</p>
        <p>username = {getUserData_from_store.username}</p>

        <div className=" flex justify-center w-full ">
          <div className=" flex flex-col justify-center items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setShowForm(!showForm)}>
                  Edit profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <EditProfileForm
                  id={getUserData_from_store.id}
                  username={getUserData_from_store.username}
                  fullname={getUserData_from_store.fullName}
                  email={getUserData_from_store.email}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="  " onClick={() => setAddText(!addText)}>
                  Add text
                </Button>
              </DialogTrigger>
              <DialogContent className="w-fit bg-slate-200">
                <DialogHeader>
                  <DialogTitle>Add new post</DialogTitle>
                  <DialogDescription>
                    Add new text post for your followers!
                  </DialogDescription>
                </DialogHeader>
                <div className=" flex gap-2 w-fit">
                  <Card
                    cardRef={cardRef}
                    text={text}
                    tags={tags}
                    username={getUserData_from_store.username}
                    objectId={""}
                    newPost={true}
                  />
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                          <>
                            <FormItem>
                              <FormControl>
                                <Input
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setText(e.target.value);
                                  }}
                                  type="text"
                                  placeholder="Enter your text"
                                  className="bg-slate-50 "
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <>
                            <FormItem>
                              <FormControl>
                                <Input
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setTags(e.target.value);
                                  }}
                                  type="text"
                                  placeholder="Enter tags"
                                  className=" bg-slate-50 "
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={!getUserData_from_store.id}
                      >
                        {isAddingText == null ? (
                          "Submit"
                        ) : isAddingText ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                          </>
                        ) : textSubmitted ? (
                          <CheckIcon size={20} className="animate-ping" />
                        ) : (
                          "Not submitted"
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            <SignOutButton>
              <Button
                onClick={() => dispatchUser(clearUserData())}
                className="bg-red-200 hover:bg-red-500"
              >
                Sign out
              </Button>
            </SignOutButton>
          </div>
        </div>

        <div className=" flex justify-center w-screen ">
          <div className="flex gap-4 flex-wrap p-10 ">
            {getUserPosts.map((data, index) => (
              <CardObserver
                key={data._id}
                objectId={data._id}
                username={getUserData_from_store.username}
                text={data.text}
                tags={data.tags}
                newLimit={() => setPageNo(pageNo + 1)}
                isLast={index === getUserPosts.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
