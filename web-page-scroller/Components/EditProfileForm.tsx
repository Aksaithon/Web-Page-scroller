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
import { Check, CheckIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setFullName,
  setUserName,
} from "@/lib/features/addUserData/userDataSlice";

interface Userdata {
  id: string | undefined;
  username: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  onCloseDialog: () => void; // Define the type of onCloseDialog;
}

const EditProfileForm: React.FC<Userdata> = ({
  id,
  username,
  fullname,
  email,
  onCloseDialog,
}) => {
  const router = useRouter();

  const [isChecking, setIsChecking] = useState<boolean | null>(null);

  const [newUsernameAvailable, setNewUsernameAvailable] = useState<
    boolean | null
  >(null);

  const [newUsername, setNewUsername] = useState<string | null | undefined>(
    username
  );
  const [newFullname, setNewFullname] = useState<string | null | undefined>(
    fullname
  );

  const [newEmail, setNewEmail] = useState<string | null | undefined>(email);

  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // DISPACH userData to redux-store
  const dispatchUser = useDispatch();

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(25),
    fullname: z
      .string()
      .min(3, { message: "Fullname must be at least 4 characters." }),
    email: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username,
      fullname: fullname,
      email: email,
    },
  });

  const handleUsername = async (username: string | null) => {
    // check username's uniqueness

    if (!username) return;

    if (username.length >= 2) {
      setIsChecking(true);
      const res = await fetch(
        `http://localhost:3000/api/checkUserName/${username}`
      );

      const nameAvailablity = await res.json();

      setNewUsernameAvailable(nameAvailablity.isAvailable);

      setIsChecking(false);

      if (newUsernameAvailable) {
        setNewUsername(username);
      }
    } else {
      setIsChecking(null);
      setNewUsernameAvailable(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // chack what changed

    setIsSubmitting(true);

    setTimeout(() => {
      const isUserNameChanged = !(username == newUsername);
      const isFullnameChanged = !(fullname == newFullname);
      const isEmailChanged = !(email == newEmail);
      // then update them

      if (isUserNameChanged || isFullnameChanged || isEmailChanged) {
        const res = fetch(`http://localhost:3000/api/formData/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: isFullnameChanged ? newFullname : fullname,
            username: isUserNameChanged ? newUsername : username,
            email: isEmailChanged ? newEmail : email,
          }),
        });
      }

      setSubmitted(true);
      setIsSubmitting(false);
      dispatchUser(
        setUserName({
          username: newUsername as string,
        })
      );

      dispatchUser(
        setFullName({
          fullName: newFullname as string,
        })
      );

      onCloseDialog();
      // location.reload();
    }, 1200);
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
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          field.value = e.target.value;
                          handleUsername(e.target.value);
                        }}
                        type="text"
                        placeholder={username}
                        className=" text-white lowercase "
                      />
                      <p className=" text-orange-400 ">
                        {isChecking == null ? null : isChecking ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                          </>
                        ) : newUsernameAvailable ==
                          null ? null : newUsernameAvailable ? (
                          "✔️"
                        ) : newUsername == username ? (
                          "✔️"
                        ) : (
                          "✖️"
                        )}
                      </p>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {newUsernameAvailable == null
                      ? null
                      : newUsernameAvailable
                      ? "available"
                      : newUsername == username
                      ? "obviously 😂"
                      : "not available"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      field.value = e.target.value;
                      setNewFullname(e.target.value);
                    }}
                    type="text"
                    placeholder={fullname}
                    className=" text-white "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      field.value = e.target.value;
                      setNewEmail(e.target.value);
                    }}
                    type="email"
                    placeholder={email}
                    className=" text-white "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : submitted ? (
              <CheckIcon size={20} className="animate-ping" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
