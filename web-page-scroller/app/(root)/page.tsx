"use client";
import React, { useEffect, useState } from "react";
import CardObserver from "@/components/CardObserver";

interface TextData {
  _id: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home = () => {
  const [allTexts, setAllTexts] = useState<TextData[]>([]);
  const [pageNo, setPageNo] = useState(1);

  const getAllData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/appData?page=${pageNo}`,
        {
          cache: "no-cache",
        }
      );

      const texts = await res.json();

      setAllTexts((prev) => [...prev, ...texts]);
    } catch (error) {
      console.log("Failed to get all data", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [pageNo]);

  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        {allTexts.map((data, index) => (
          <CardObserver
            key={data._id}
            text={allTexts[index].text}
            tags={allTexts[index].tags}
            newLimit={() => setPageNo(pageNo + 1)}
            isLast={index === allTexts.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
