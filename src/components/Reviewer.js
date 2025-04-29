/*
Reviewer.js

This provides a series of multiple choice questions with limited user selection 
of one and a space for entering additional comments.

*/

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Reviewer.module.css";
import { useRouter } from "next/router";

export default function Reviewer({
  initialResponses = {},
  initialComment = "",
}) {
  const defaultQuestions = [
    {
      id: "storage_space",
      prompt: "How much storage did you have?",
      scale: { low: "Very Little Storage", high: "Lots of Storage" },
    },
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
    {
      id: "size",
      prompt: "How big was your dorm?",
      scale: { low: "Very Little", high: "Very Big" },
    },
    {
      id: "dining_hall_proximity",
      prompt: "How close was the nearest dining hall?",
      scale: { low: "Very Far", high: "Very Close" },
    },
    {
      id: "laundry",
      prompt: "How close was the nearest laundry?",
      scale: { low: "Very Far", high: "Very Close" },
    },
    {
      id: "public_bathrooms",
      prompt: "Rate the quality of the public bathrooms in your dorm.",
      scale: { low: "Bad quality", high: "Great quality" },
    },
    {
      id: "public_kitchens",
      prompt: "Rate the quality of the public kitchens in your dorm.",
      scale: { low: "Bad quality", high: "Great quality" },
    },
    {
      id: "ac_proximity",
      prompt: "How close are you to the athletic center?",
      scale: { low: "Very far", high: "Very close" },
    },
    {
      id: "elevators",
      prompt: "How many elevators are in your dorm and how reliable are they?",
      scale: { low: "No elevators", high: "Many very reliable elevators" },
    },
  ];

  const router = useRouter();

  // These are placeholders for now we will add all dorms when we set up our API in next sprint

  //const dormOptions = ["Gifford", "Battell"];
  //const roomTypes = ["Single", "Double", "Suites"];

  const [selectedDorm, setSelectedDorm] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [responses, setResponses] = useState(initialResponses);
  const [comment, setComment] = useState(initialComment);
  const [questions] = useState(defaultQuestions);

  //*******************

  const [dormOptions, setDormOptions] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [dormsRoomTypes, setdormsRoomTypes] = useState([]);

  useEffect(() => {
    const fetchDormsAndRoomTypes = async () => {
      try {
        const response = await fetch("/api/dorms");
        if (response.ok) {
          const data = await response.json();
          const drt = data.reduce((dict, dorm) => {
            dict[dorm.id] = dorm.roomTypes;
            return dict;
          }, {});
          setdormsRoomTypes(drt);

          const dorms = data.map((dorm) => dorm.name);
          setDormOptions(dorms);
        } else {
          console.error(
            "Failed to fetch dorms and room types:",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching dorms and room types:", error);
      }
    };
    fetchDormsAndRoomTypes();
  }, []);

  useEffect(() => {
    setRoomTypes(dormsRoomTypes[selectedDorm] || []);
  }, [selectedDorm, dormsRoomTypes]);

  //*******************

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  const handleSubmit = async () => {
    const reviewData = {
      dorm: selectedDorm,
      roomType: selectedRoomType,
      responses,
      comment,
    };

    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      console.log(await response.json());
      router.push("/submission");
    } else {
      console.error("Failed to submit review:", response.statusText);
    }
  };

  return (
    <div className={styles.overall}>
      <h1>Rate Your Dorm Experience</h1>

      {/* Dorm selector */}
      <div className={styles.question}>
        <h3>Select Your Dorm:</h3>
        <select
          value={selectedDorm}
          onChange={(e) => setSelectedDorm(e.target.value)}
          className={styles.select}
        >
          <option value="">-- Choose a dorm --</option>

          {dormOptions.map((dorm) => (
            <option key={dorm} value={dorm}>
              {dorm}
            </option>
          ))}
        </select>
      </div>
      {/* Room type selector */}
      <div className={styles.question}>
        <h3>Select Your Room Type:</h3>
        <select
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
          className={styles.select}
        >
          <option value="">-- Choose a room type --</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {questions.map((question) => (
        <div key={question.id} className={styles.question}>
          <p>
            {question.prompt} (1 = {question.scale.low}, 5 ={" "}
            {question.scale.high})
          </p>

          {[1, 2, 3, 4, 5].map((num) => (
            <label key={`${question.id}-${num}`} className={styles.radio}>
              <input
                type="radio"
                name={question.id}
                value={num}
                checked={responses[question.id] === num}
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
              {num}{" "}
            </label>
          ))}
        </div>
      ))}

      {/* comment box */}
      <div className={styles.question}>
        <h3> Please Leave a Comment on Your Room: </h3>
        <div className={styles.textareaWrapper}>
          <textarea
            rows={4}
            placeholder="Type your thoughts here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.text}
          />
          <div className={styles.characterCountWrapper}>
            <p
              className={
                comment.length < 100 ? styles.errorText : styles.successText
              }
            >
              {comment.length < 100
                ? `You need ${100 - comment.length} more characters`
                : "You've reached the character minimum!"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedDorm || !selectedRoomType || comment.length < 100}
        className={styles.submitButton}
      >
        Submit{" "}
      </button>
    </div>
  );
}

Reviewer.propTypes = {
  dormOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  roomTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  complete: PropTypes.func.isRequired,
  initialResponses: PropTypes.object,
  initialComment: PropTypes.string,
};
