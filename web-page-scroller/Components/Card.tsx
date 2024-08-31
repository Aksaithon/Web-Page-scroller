"use client";
import { useEffect, useRef } from "react";

export default function Card({
  newLimit,
  isLast,
  text,
  tags,
}: {
  newLimit: () => void;
  isLast: number;
}) {
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef();

  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div
      className=" flex flex-col items-center justify-center shadow-lg rounded-xl p-2 w-64 bg-white overflow-hidden"
      ref={cardRef}
    >
      <div className=" flex items-center justify-center w-fit h-96 p-5  leading-relaxed  relative  rounded-xl text-3xl ">
        {text}
      </div>
      <div className=" flex jusitfy-start w-full rounded-b-xl p-4 p-l-2">
        {tags}
      </div>
    </div>
  );
}
