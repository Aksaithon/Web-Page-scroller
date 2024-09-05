"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const SignUpForm = ({
  id,
  nameFieldRequire,
}: {
  id: string | null;
  nameFieldRequire: boolean;
}) => {
  const [isChecking, setIsChecking] = useState<boolean | null>(null);
  const [userNameAvailable, setUserNameAvailable] = useState<boolean | null>(
    null
  );
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(25),

    fullname: nameFieldRequire
      ? z
          .string()
          .min(3, { message: "Fullname must be at least 3 characters." })
      : z.string().optional(),
  });

  const handleUsername = async (username: string | null) => {
    // check username's uniqueness

    if (username.length >= 2) {
      setIsChecking(true);
      const res = await fetch(
        `http://localhost:3000/api/checkUserName/${username}`
      );

      const nameAvailablity = await res.json();

      setUserNameAvailable(nameAvailablity.isAvailable);

      setIsChecking(false);

      if (userNameAvailable) {
        setUsername(username);
      }
    } else {
      setIsChecking(null);
      setUserNameAvailable(null);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: nameFieldRequire ? "" : undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (userNameAvailable) {
      const res = await fetch(`http://localhost:3000/api/formData/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: nameFieldRequire
          ? JSON.stringify({
              name: fullName,
              username: username,
            })
          : JSON.stringify({
              username: username,
            }),
      });

      console.log(values);

      router.push("/dashboard");
    } else {
      alert("Username is already taken. Please choose a different one.");
    }
  }

  return (
    <div className="  bg-slate-800 p-7  rounded-xl ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        onChange={(e) => {
                          field.onChange(e);
                          handleUsername(e.target.value);
                        }}
                        type="text"
                        placeholder="username"
                        className=" text-white lowercase "
                      />
                      <p className=" text-orange-400 ">
                        {isChecking == null ? null : isChecking ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                          </>
                        ) : userNameAvailable ==
                          null ? null : userNameAvailable ? (
                          "✔️"
                        ) : (
                          "✖️"
                        )}
                      </p>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {userNameAvailable == null
                      ? null
                      : userNameAvailable
                      ? "available"
                      : "not available"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {nameFieldRequire ? (
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        field.onChange(e);
                        setFullName(e.target.value);
                      }}
                      placeholder="fullname"
                      className=" text-white "
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
