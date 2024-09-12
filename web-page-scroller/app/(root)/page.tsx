"use client";
import React, { useEffect, useState } from "react";
import CardObserver from "@/components/CardObserver";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  addNewReel,
  setAllReels,
} from "@/lib/features/addReelPosts/reelPostSlice";

interface TextData {
  _id: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home = () => {
  const [pageNo, setPageNo] = useState(1);

  const dispatchReels = useDispatch<AppDispatch>();

  const allReels = useSelector((state: RootState) => state.allReels.reels);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/appData?page=${pageNo}`,
          {
            cache: "no-cache",
          }
        );

        const texts = await res.json();

        if (allReels.length === 0) {
          dispatchReels(setAllReels(texts));
        } else {
          dispatchReels(addNewReel(texts));
        }
      } catch (error) {
        console.log("Failed to get all data", error);
      }
    };
    if (allReels.length < pageNo * 5) {
      getAllData();
    }
  }, [allReels.length, dispatchReels, pageNo]);

  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        {allReels.map((data, index) => (
          <>
            <CardObserver
              key={data._id}
              text={allReels[index].text}
              tags={allReels[index].tags}
              newLimit={() => setPageNo(pageNo + 1)}
              isLast={index === allReels.length - 1}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default Home;
