"use client";
import React, { useState } from "react";
import { More_functions } from "./More_functions";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setUserData } from "@/lib/features/addUserData/userDataSlice";
import { updateReel } from "@/lib/features/addReelPosts/reelPostSlice";
import { updatePost } from "@/lib/features/addUserPosts/userPostSlice";

const Card = ({
  cardRef,
  objectId,
  username,
  text,
  tags,
  likes,
  newPost,
}: {
  cardRef: any;
  objectId: string;
  username: string;
  text: string;
  tags: string[] | string | undefined;
  likes: number; // Number of likes for the Card component
  newPost: boolean;
}) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(likes);

  const dispatchUser = useDispatch();

  const increaseLike = async () => {
    setLikeCount((prev) => prev + 1);

    dispatchUser(
      updateReel({
        _id: objectId,
        username: username,
        text: text,
        tags: tags,
        likes: likeCount + 1,
      })
    );

    dispatchUser(
      updatePost({
        _id: objectId,
        username: username,
        text: text,
        tags: tags,
        likes: likeCount + 1,
      })
    );

    const res = await fetch(
      `http://localhost:3000/api/likesData?postId=${objectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likeCount + 1,
        }),
      }
    );
  };

  const dicreaseLike = async () => {
    setLikeCount((prev) => prev - 1);

    dispatchUser(
      updateReel({
        _id: objectId,
        username: username,
        text: text,
        tags: tags,
        likes: likeCount - 1,
      })
    );

    dispatchUser(
      updatePost({
        _id: objectId,
        username: username,
        text: text,
        tags: tags,
        likes: likeCount - 1,
      })
    );
    const res = await fetch(
      `http://localhost:3000/api/likesData?postId=${objectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likeCount - 1,
        }),
      }
    );
  };

  return (
    <div
      className=" flex flex-col items-center shadow-lg rounded-xl pt-0 w-[272.75px] bg-white overflow-hidden"
      ref={cardRef}
    >
      <div className=" flex justify-end items-start w-full ">
        <div className=" ">
          {!newPost && (
            <More_functions
              objectId={objectId}
              cardRef={cardRef}
              currText={text}
              currtags={tags}
              username={username}
              likes={likes}
            />
          )}
        </div>
      </div>
      <div className=" flex h-96 p-5 text-left text-wrap rounded-xl text-3xl thisText  ">
        {text}
      </div>
      <div className=" flex flex-col jusitfy-start w-full rounded-b-xl p-4 p-l-2">
        <div className="theseTags">{tags}</div>
        <div className="thisUser flex gap-2 ">
          {username}
          {!newPost && (
            <>
              {like ? (
                <Image
                  onClick={() => {
                    setLike(false);
                    dicreaseLike();
                    console.log(objectId);
                  }}
                  src={"/full_heart.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                  className=" hover:cursor-pointer"
                />
              ) : (
                <Image
                  onClick={() => {
                    setLike(true);
                    increaseLike();
                    console.log(objectId);
                  }}
                  src={"/border_heart.svg"}
                  alt="border_heart"
                  width={24}
                  height={24}
                  className=" hover:cursor-pointer"
                />
              )}
              {likeCount}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
