"use client";
import React, { useEffect, useState } from "react";
import CardObserver from "@/components/CardObserver";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  addNewReel,
  setAllReels,
} from "@/lib/features/addReelPosts/reelPostSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const router = useRouter();
  allReels && router.replace(`/reels/${allReels[0]?._id}`);

};

export default Home;
