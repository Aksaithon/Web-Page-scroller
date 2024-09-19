"use client";
import Card from "@/components/Card";
import {
  addNewReel,
  setAllReels,
} from "@/lib/features/addReelPosts/reelPostSlice";
import { isDataLeft } from "@/lib/features/dataLeft/dataLeftSlice";
import { updatePageNo } from "@/lib/features/pageNo/pageNoSlice";
import { updateIndex } from "@/lib/features/reelIndex/reelIndexSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reel = ({ params }: any) => {
  const { id } = params;
  const cardRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const reels = useSelector((state: RootState) => state.allReels.reels);
  const pageNo = useSelector((state: RootState) => state.pageNo.page);
  const reelIndex = useSelector((state: RootState) => state.reelIndex.index);
  const dataLeft = useSelector((state: RootState) => state.dataLeft.dataLeft);

  const [isAnimating, setIsAnimating] = useState(false); // State to track animation

  const getAllData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/appData?page=${pageNo + 1}`,
        {
          cache: "no-cache",
        }
      );

      const texts = await res.json();

      if (reels.length === 0) {
        dispatch(setAllReels(texts));
      } else {
        if (texts.length > 0) {
          dispatch(addNewReel(texts));
        } else {
          dispatch(isDataLeft(false));
        }
      }
    } catch (error) {
      console.log("Failed to get all data", error);
    }
  };

  const nextReel = () => {
    if (!isAnimating) {
      setIsAnimating(true); // Start the animation

      setTimeout(() => {
        dispatch(updateIndex(reelIndex + 1));
        if (reelIndex + 1 === reels.length - 1) {
          dispatch(updatePageNo(pageNo + 1));
          getAllData();
        }
        setIsAnimating(false); // End the animation
      }, 500); // Duration of the animation in milliseconds
    }
  };

  const prevReel = () => {
    if (!isAnimating && reelIndex > 0) {
      setIsAnimating(true); // Start the animation

      setTimeout(() => {
        dispatch(updateIndex(reelIndex - 1));
        setIsAnimating(false); // End the animation
      }, 500); // Duration of the animation in milliseconds
    }
  };

  return (
    <div className="flex justify-between h-screen items-center">
      {reelIndex > 0 && (
        <Link onClick={prevReel} href={`/reels/${reels[reelIndex - 1]?._id}`}>
          <Image src={"/big-left.svg"} alt="prev" width={70} height={70} />
        </Link>
      )}

      <div
        className={` transition-transform duration-1000 ease-in-out ${
          isAnimating ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Card
          key={reels[reelIndex]?._id}
          cardRef={cardRef}
          objectId={reels[reelIndex]?._id}
          username={reels[reelIndex]?.username}
          text={reels[reelIndex]?.text}
          tags={reels[reelIndex]?.tags}
          likes={reels[reelIndex]?.likes}
          newPost={false}
        />
      </div>

      {dataLeft && (
        <Link onClick={nextReel} href={`/reels/${reels[reelIndex + 1]?._id}`}>
          <Image src={"/big-right.svg"} alt="next" width={70} height={70} />
        </Link>
      )}
    </div>
  );
};

export default Reel;
