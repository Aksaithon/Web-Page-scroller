"use client";
import { useEffect, useRef } from "react";
import Card from "./Card";

export default function CardObserver({
  objectId,
  newLimit,
  isLast,
  username,
  text,
  tags,
  likes
}: {
  objectId: string; // Unique identifier for the Card component
  newLimit: () => void;
  isLast: boolean;
  username: string;
  text: string;
  tags: string[];
  likes: number;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast]);

  return (
    <Card
      cardRef={cardRef}
      objectId={objectId}
      username={username}
      text={text}
      tags={tags}
      likes={likes}
      newPost={false}
    />
  );
}
