import React from "react";
import Card from "@/Components/Card";

const getAllData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/appData", {
      cache: "no-cache",
    });

    const texts = await res.json();

    return texts;
  } catch (error) {
    console.log("Failed to get all data", error);
  }
};

const Home = async () => {
  const allTexts = await getAllData();

  console.log(allTexts);

  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        {allTexts.map((data, index) => (
          <Card
            key={data._id}
            text={allTexts[index].text}
            tags={allTexts[index].tags}
            newLimit={undefined}
            isLast={undefined}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
