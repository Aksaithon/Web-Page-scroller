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
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reel = ({ params }: any) => {
  // states for ui
  const [nextBtn, setNextBtn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [prevBtn, setPrevBtn] = useState(false);

  const { id } = params;
  const cardRef = useRef();

  const dispatch = useDispatch<AppDispatch>();
  const reels = useSelector((state: RootState) => state.allReels.reels);
  const pageNo = useSelector((state: RootState) => state.pageNo.page);
  const reelIndex = useSelector((state: RootState) => state.reelIndex.index);
  const dataLeft = useSelector((state: RootState) => state.dataLeft.dataLeft);

  const router = useRouter();

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
        console.log(texts);
        if (texts.length > 0) {
          dispatch(addNewReel(texts));
        } else {
          console.log("no data available");
          dispatch(isDataLeft(false));
        }
      }
    } catch (error) {
      console.log("Failed to get all data", error);
    }
  };

  const nextReel = () => {
    setPrevBtn(false);
    setNextBtn(true);
    setAnimating(true);
    setTimeout(() => {
      dispatch(updateIndex(reelIndex + 1));
      console.log(reelIndex);
      setAnimating(false);

      if (reelIndex + 1 === reels.length - 1) {
        console.log("fetching more reele");
        dispatch(updatePageNo(pageNo + 1));
        getAllData();
      }

      router.push(`/reels/${reels[reelIndex - 1]?._id}`);
    }, 700);
  };

  const prevReel = () => {
    setNextBtn(false);
    setPrevBtn(true);
    setAnimating(true);
    setTimeout(() => {
      if (reelIndex - 1 === 0) {
        dispatch(updateIndex(0));
      } else {
        dispatch(updateIndex(reelIndex - 1));
        dispatch(isDataLeft(true));
      }
      router.push(`/reels/${reels[reelIndex - 1]?._id}`);
      setAnimating(false);
    }, 700);
  };

  return (
    <div className=" flex justify-between h-screen items-center relative overflow-hidden ">
      {reelIndex > 0 ? (
        <button onClick={prevReel}>
          <Image src={"/big-left.svg"} alt="prev" width={70} height={70} />
        </button>
      ) : (
        <div className="w-[70px]"></div>
      )}

      <div
        className={`flex flex-col gap-3 ${
          reelIndex > 0 ? "translate-y-0" : "translate-y-1/3"
        }   `}
      >
        {/*2nd prev card */}
        {reelIndex > 0 && (
          <div
            className={` transition-transform duration-700 ease-in-out ${
              nextBtn ? " -translate-y-full" : prevBtn ? "translate-y-full" : ""
            }`}
          >
            <Card
              key={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?._id
              }
              cardRef={cardRef}
              objectId={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?._id
              }
              username={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?.username
              }
              text={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?.text
              }
              tags={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?.tags
              }
              likes={
                reels[
                  !prevBtn
                    ? reelIndex - 2
                    : animating
                    ? reelIndex - 2
                    : reelIndex - 1
                ]?.likes
              }
              newPost={false}
            />
          </div>
        )}
        {/* prev card */}
        {reelIndex > 0 && (
          <div
            className={` transition-transform duration-700 ease-in-out ${
              nextBtn ? " -translate-y-full" : prevBtn ? "translate-y-full" : ""
            }`}
          >
            <Card
              key={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?._id
              }
              cardRef={cardRef}
              objectId={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?._id
              }
              username={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?.username
              }
              text={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?.text
              }
              tags={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?.tags
              }
              likes={
                reels[
                  !prevBtn
                    ? reelIndex - 1
                    : animating
                    ? reelIndex - 1
                    : reelIndex
                ]?.likes
              }
              newPost={false}
            />
          </div>
        )}

        {/* current card */}
        <div
          className={` transition-transform duration-700 ease-in-out ${
            nextBtn ? " -translate-y-full" : prevBtn ? "translate-y-full" : ""
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

        {/* next card */}
        <div
          className={` transition-transform duration-700 ease-in-out ${
            nextBtn ? " -translate-y-full " : prevBtn ? "translate-y-full" : ""
          } `}
        >
          <Card
            key={reels[!nextBtn && animating ? reelIndex + 1 : 0]?._id}
            cardRef={cardRef}
            objectId={
              reels[
                !nextBtn ? reelIndex + 1 : animating ? reelIndex + 1 : reelIndex
              ]?._id
            }
            username={
              reels[
                !nextBtn ? reelIndex + 1 : animating ? reelIndex + 1 : reelIndex
              ]?.username
            }
            text={
              reels[
                !nextBtn ? reelIndex + 1 : animating ? reelIndex + 1 : reelIndex
              ]?.text
            }
            tags={
              reels[
                !nextBtn ? reelIndex + 1 : animating ? reelIndex + 1 : reelIndex
              ]?.tags
            }
            likes={
              reels[
                !nextBtn ? reelIndex + 1 : animating ? reelIndex + 1 : reelIndex
              ]?.likes
            }
            newPost={false}
          />
        </div>
        {/* 2nd next card */}
        {/* {dataLeft && ( */}
        <div
          className={` transition-transform duration-700 ease-in-out ${
            nextBtn ? " -translate-y-full " : prevBtn ? "translate-y-full" : ""
          } `}
        >
          <Card
            key={reels[!nextBtn && animating ? reelIndex + 2 : 1]?._id}
            cardRef={cardRef}
            objectId={
              reels[
                !nextBtn
                  ? reelIndex + 2
                  : animating
                  ? reelIndex + 2
                  : reelIndex + 1
              ]?._id
            }
            username={
              reels[
                !nextBtn
                  ? reelIndex + 2
                  : animating
                  ? reelIndex + 2
                  : reelIndex + 1
              ]?.username
            }
            text={
              reels[
                !nextBtn
                  ? reelIndex + 2
                  : animating
                  ? reelIndex + 2
                  : reelIndex + 1
              ]?.text
            }
            tags={
              reels[
                !nextBtn
                  ? reelIndex + 2
                  : animating
                  ? reelIndex + 2
                  : reelIndex + 1
              ]?.tags
            }
            likes={
              reels[
                !nextBtn
                  ? reelIndex + 2
                  : animating
                  ? reelIndex + 2
                  : reelIndex + 1
              ]?.likes
            }
            newPost={false}
          />
        </div>
        {/* )} */}
      </div>
      {dataLeft ? (
        <button onClick={nextReel}>
          <Image src={"/big-right.svg"} alt="next" width={70} height={70} />
        </button>
      ) : (
        <div className="w-[70px]"></div>
      )}
    </div>
  );
};

export default Reel;
