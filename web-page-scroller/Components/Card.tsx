import React from "react";
import { More_functions } from "./More_functions";

const Card = ({
  cardRef,
  objectId,
  username,
  text,
  tags,
  newPost,
}: {
  cardRef: any;
  objectId: string;
  username: string;
  text: string;
  tags: string[] | string | undefined;
  newPost: boolean;
}) => {
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
            />
          )}
        </div>
      </div>
      <div className=" flex items-center justify-center w-fit h-96 p-5  leading-relaxed  relative  rounded-xl text-3xl thisText  ">
        {text}
      </div>
      <div className=" flex flex-col jusitfy-start w-full rounded-b-xl p-4 p-l-2">
        <div className="theseTags">{tags}</div>
        <div className="thisUser">{username}</div>
      </div>
    </div>
  );
};

export default Card;
