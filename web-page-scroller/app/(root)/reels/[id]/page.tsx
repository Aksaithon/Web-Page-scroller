"use client";
import Card from "@/components/Card";
import {
  addNewReel,
  setAllReels,
} from "@/lib/features/addReelPosts/reelPostSlice";
import { updatePageNo } from "@/lib/features/pageNo/pageNoSlice";
import { updateIndex } from "@/lib/features/reelIndex/reelIndexSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reel = ({ params }: any) => {
  const { id } = params;
  const cardRef = useRef();

  const dispatch = useDispatch<AppDispatch>();
  const reels = useSelector((state: RootState) => state.allReels.reels);
  const pageNo = useSelector((state: RootState) => state.pageNo.page);
  const reelIndex = useSelector((state: RootState) => state.reelIndex.index);

  const [isFetching, setIsFetching] = useState(false); // Flag to prevent duplicate fetches
  const [hasMoreData, setHasMoreData] = useState(true); // Flag to handle the end of data

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
        dispatch(addNewReel(texts));
      }
    } catch (error) {
      console.log("Failed to get all data", error);
    }
  };

  const nextReel = () => {
    dispatch(updateIndex(reelIndex + 1));
    console.log(reelIndex);

    if (reelIndex + 1 === reels.length - 1) {
      console.log("fetching more reele");
      dispatch(updatePageNo(pageNo + 1));
      getAllData();
    }
  };

  const prevReel = () => {
    if (reelIndex - 1 === 0) {
      dispatch(updateIndex(0));
    } else {
      dispatch(updateIndex(reelIndex - 1));
    }
  };

  return (
    <div>
      {reelIndex > 0 && (
        <Link onClick={prevReel} href={`/reels/${reels[reelIndex - 1]?._id}`}>
          prev reel
        </Link>
      )}
      <Link onClick={nextReel} href={`/reels/${reels[reelIndex + 1]?._id}`}>
        next reel
      </Link>
      {id}

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
  );
};

export default Reel;
