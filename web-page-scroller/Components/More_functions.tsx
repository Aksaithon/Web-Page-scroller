"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  CheckCircle,
  CheckCircle2Icon,
  CheckIcon,
  CircleCheck,
  Loader2,
  LucideCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BreadcrumbEllipsis, BreadcrumbItem } from "./ui/breadcrumb";
import { DialogDemo } from "./Dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import Card from "./Card";
import { DialogClose } from "@radix-ui/react-dialog";

export function More_functions({
  objectId,
  cardRef,
  currText,
  currtags,
  username,
  likes,
}: {
  objectId: string;
  cardRef: any;
  currText: string;
  currtags: string[] | string | undefined;
  username: string;
  likes: number;
}) {
  const [text, setText] = useState<string>(currText);
  const [tags, setTags] = useState<string[] | string | undefined>(currtags);
  const [isEditingText, setIsEditingText] = useState<boolean | null>(null);
  const [textEdited, setTextEdited] = useState<boolean | null>(null);

  // DISPACH userData to redux-store
  const dispatchUser = useDispatch();

  // DISPACH userPost data to redux-store
  const dispatchPosts = useDispatch<AppDispatch>();

  // RETRIEVE userData from redux-store
  const getUserData_from_store = useSelector((state: RootState) => state.user);
  // RETRIEVE userPosts from redux-store
  const getUserPosts = useSelector((state: RootState) => state.userPosts.posts);

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
    setIsEditingText(true);

    setTimeout(async () => {
      const res = await fetch(
        `http://localhost:3000/api/userData?id=${objectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            text: values.text,
            tags: values.tags.split(","), // Split tags by commas into an array
          }),
        }
      );

      if (res.ok) {
        setIsEditingText(false);
        setTextEdited(true);
        setText(""); // Reset form after submission
        setTags("");
      } else {
        setTextEdited(false);
      }

      location.reload();
    }, 1100);
  }

  const deletePost = (): void => {
    // find userId and postId
    const userId = getUserData_from_store?.id;
    const postId = objectId;

    // delete post from the server
    fetch(
      `http://localhost:3000/api/appData?postId=${postId}&userId=${userId}`,
      {
        method: "DELETE",
      }
    );

    location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BreadcrumbItem className=" hover:cursor-pointer">
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {getUserData_from_store?.username == username && (
            <>
              {/* edit opetion */}
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => console.log(objectId)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    Edit
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="w-fit bg-slate-200">
                  <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                    <DialogDescription>
                      Make changes to your post here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className=" flex gap-2 w-fit">
                    <Card
                      cardRef={cardRef}
                      text={text}
                      tags={tags}
                      username={username}
                      objectId={objectId}
                      likes={likes}
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
                                    value={text}
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
                                    value={tags}
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
                          {isEditingText == null ? (
                            "Submit"
                          ) : isEditingText ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />
                            </>
                          ) : textEdited ? (
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

              {/* delete opetion */}
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Delete
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className=" flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                    <DialogDescription>
                      Make changes to your post here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>

                  <div className=" flex gap-3">
                    <DialogClose>
                      <Button
                        onClick={() => deletePost()}
                        className=" bg-red-800 rounded-md px-2 py-1 "
                      >
                        Delete
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className=" bg-slate-800 rounded-md px-2 py-1 ">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          {/* Share option */}
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Share
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className=" flex flex-col">
              <DialogHeader>
                <DialogTitle>Share post</DialogTitle>
                <DialogDescription>
                  Share your post with someone who appreciates you!!
                </DialogDescription>
              </DialogHeader>

              <div className=" flex gap-3">
                <DialogClose asChild>
                  <Button className=" bg-slate-800 rounded-md px-2 py-1 ">
                    Share
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
