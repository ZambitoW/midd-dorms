import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Editor.module.css";
import { useRouter } from "next/router";

export default function Editor({ id }) {
  const questions = [
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

  const [review, setReview] = useState({});

  useEffect(() => {
    //Just make sure that id is defied before we try to fetch
    if (!id) return;
    const fetchReview = async () => {
      const response = await fetch(`/api/reviews/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReview(data);
      }
    };
    fetchReview();
  }, [id]);

  const handleEditSubmit = async (editedReview) => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editedReview,
        //created_at: new Date().toISOString(),
        //maybe add an updated_at field
      }),
    });
    if (response.ok) {
      router.push(`/dorms/${review.buildingId}`);
    }
  };

  const handleChange = (questionId, value) => {
    setReview((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (review.comment === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
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
                  checked={review[question.id] === num}
                  onChange={(e) =>
                    handleChange(question.id, Number(e.target.value))
                  }
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
              value={review.comment}
              onChange={(e) =>
                setReview((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              className={styles.text}
            />
            <div className={styles.characterCountWrapper}>
              <p
                className={
                  review.comment.length < 100
                    ? styles.errorText
                    : styles.successText
                }
              >
                {review.comment.length < 100
                  ? `You need ${100 - review.comment.length} more characters`
                  : "You've reached the character minimum!"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleEditSubmit(review)}
          disabled={review.comment.length < 100}
          className={styles.submitButton}
        >
          Submit{" "}
        </button>
      </div>
    );
  }
}

Editor.propTypes = {
  id: PropTypes.number.isRequired,
};
