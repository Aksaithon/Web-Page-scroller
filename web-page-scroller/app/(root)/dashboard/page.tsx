"use client";
import Card from "@/components/Card";
import EditProfileForm from "@/components/EditProfileForm";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const { user, isLoaded } = useUser(); // clerk
  const [showForm, setShowForm] = useState(false);
  const [addText, setAddText] = useState(false);
  const cardRef = useRef();

  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string>();

  const formSchema = z.object({
    text: z
      .string()
      .min(8, { message: "Username must be at least 8 characters." })
      .max(25),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      tags: "[]",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {


    const res = await fetch(`http://localhost:3000/api/appData`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: thisUser?.user.id,  // Pass the logged-in user's ID
        text: values.text,
        tags: values.tags.split(","),  // Split tags by commas into an array
      }),
    })

    if (res.ok) {
      alert("Text data added successfully!");
      setText("");  // Reset form after submission
      setTags("");
      setAddText(false)

    }else{
      alert("Failed to add text data.");
    }

    location.reload();

  }

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

      <div className=" flex flex-col justify-center items-center" >
        <Button className=" w-[500px] "  onClick={() => setAddText(!addText)}>Add text</Button>

        {addText && (
          <>
            <div className=" flex flex-col w-[500px] justify-center items-center bg-stone-200 ">
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
                            />
                          </FormControl>
                        </FormItem>
                      </>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>

              <Card cardRef={cardRef} text={text} tags={tags}/>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
