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
  const [name, setName] = useState<string | null | undefined>("");
  const [thisUser, setThisUser] = useState<myUserData>();
  const { user, isLoaded } = useUser(); // clerk
  const [showForm, setShowForm] = useState(false);
  const [addText, setAddText] = useState(false);
  const cardRef = useRef();

  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string>();

  const [usersAllTexts, setAllTexts] = useState<TextData[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isAddingText, setIsAddingText] = useState<boolean | null>(null);
  const [textSubmitted, setTextSubmitted] = useState<boolean | null>(null);

  const router = useRouter();

  const formSchema = z.object({
    text: z
      .string()
      .min(8, { message: "Username must be at least 8 characters." }),
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
          userId: thisUser?.user.id, // Pass the logged-in user's DB ID
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
    }, 1300);
  }

  // get current user data
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

  //  get current user's all text posts from the database
  useEffect(() => {
    const getUserAllTexts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/userData?userId=${thisUser?.user.id}&page=${pageNo}`,
        {
          cache: "no-cache",
        }
      );

      const data = await res.json();

      // console.log(data.textData, thisUser?.user.id);

      if (data.length > 0) {
        setAllTexts((prev) => [...prev, ...data]);
      }
    };

    if (thisUser) {
      getUserAllTexts();
    }
  }, [pageNo, thisUser]);

  return (
    <>
      <div className=" bg-slate-100 flex flex-col gap-3 justify-center items-center scrollbar-thin ">
        <p>id = {thisUser?.user.id}</p>
        <p>email = {thisUser?.user.email}</p>
        <p>name = {thisUser?.user.name}</p>
        <p>username = {thisUser?.user.username}</p>

        <div className=" flex  justify-center w-screen ">
          <div className=" flex flex-col justify-center items-center gap-3">
            <Button onClick={() => setShowForm(!showForm)}>Edit profile</Button>

            {showForm && (
              <EditProfileForm
                id={thisUser?.user.id}
                username={thisUser?.user.username}
                fullname={thisUser?.user.name}
                email={thisUser?.user.email}
              />
            )}

            <Button className="  " onClick={() => setAddText(!addText)}>
              Add text
            </Button>

            {addText && (
              <div className=" flex w-[500px] justify-center bg-stone-200 rounded-3xl gap-4 p-6 ">
                <>
                  <Card cardRef={cardRef} text={text} tags={tags} />
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
                                  className=" bg-stone-300 "
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
                                  className=" bg-stone-300 "
                                />
                              </FormControl>
                            </FormItem>
                          </>
                        )}
                      />
                      <Button type="submit" disabled={!thisUser?.user.id}>
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
                </>
              </div>
            )}
            <SignOutButton>
              <Button className="bg-red-200 hover:bg-red-500">Sign out</Button>
            </SignOutButton>
          </div>
        </div>

        <div className=" flex items-end w-screen ">
          <div className="flex gap-2 flex-wrap w-fit">
            {usersAllTexts.map((data, index) => (
              <CardObserver
                key={data._id}
                text={data.text}
                tags={data.tags}
                newLimit={() => setPageNo(pageNo + 1)}
                isLast={index === usersAllTexts.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
