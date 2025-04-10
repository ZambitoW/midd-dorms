//import {useState} from "react";
import Reviewer from "./Reviewer";

export default function RateDormPage() {
  //  const dormOptions = [
  // { id: "Gifford"},
  // { id: "Ross"},
  // { id: "Coffrin"},
  //];
  const questions = [
    {
      id: "clean",
      prompt: "How clean was your dorm?",
      scale: { low: "Not Clean", high: "Very Clean" },
    },
    {
      id: "noise",
      prompt: "How loud was your dorm?",
      scale: { low: "Very Loud", high: "Not Loud" },
    },
  ];

  const handleComplete = (reviewData) => {
    console.log("Review submitted:", reviewData);
  };

  return (
    <div>
      <h1>Rate Your Dorm</h1>
      <Reviewer
        dormId={dormId}
        questions={questions}
        complete={handleComplete}
      />
    </div>
  );
}
