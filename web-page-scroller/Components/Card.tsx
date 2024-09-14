import React from "react";

const Card = ({
  cardRef,
  username,
  text,
  tags,
}: {
  cardRef: any;
  username: string;
  text: string;
  tags: string[] | string | undefined;
}) => {
  return (
    <div
      className=" flex flex-col items-center justify-center shadow-lg rounded-xl p-2 w-[272.75px] bg-white overflow-hidden"
      ref={cardRef}
    >
      <div className=" flex items-center justify-center w-fit h-96 p-5  leading-relaxed  relative  rounded-xl text-3xl ">
        {text}
      </div>
      <div className=" flex flex-col jusitfy-start w-full rounded-b-xl p-4 p-l-2">
        <div>{tags}</div>
        <div>{username}</div>
      </div>
    </div>
  );
};

export default Card;
