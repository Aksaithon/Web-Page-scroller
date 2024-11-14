import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckIcon, Loader2, PlusIcon } from "lucide-react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TextData {
  _id: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Post_Creator = () => {
  const [addText, setAddText] = useState(false);
  const cardRef = useRef(null);

  const [text, setText] = useState<string>();
  const [tags, setTags] = useState<string>();

  const [isAddingText, setIsAddingText] = useState<boolean | null>(null);
  const [textSubmitted, setTextSubmitted] = useState<boolean | null>(null);

  const getUserData_from_store = useSelector((state: RootState) => state.user);

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
        form.reset();
      } else {
        setTextSubmitted(false);
      }

      location.reload();
    }, 1100);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full" onClick={() => setAddText(!addText)}>
          create
        </span>
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
            text={text as string}
            tags={tags}
            username={getUserData_from_store.username}
            likes={0}
            objectId={""}
            newPost={true}
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          field.value = e.target.value;
                          setText(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter your text"
                        className="bg-slate-50 "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          field.value = e.target.value;

                          setTags(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter tags"
                        className=" bg-slate-50 "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!getUserData_from_store.id}>
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
  );
};

export default Post_Creator;
