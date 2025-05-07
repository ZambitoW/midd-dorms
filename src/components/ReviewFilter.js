/*
ReviewFilter.js
This filters the reviews to look at specific ratings and features.
*/

import PropTypes from "prop-types";
import { defaultQuestions } from "./Reviewer";
import styles from "@/styles/ReviewFilter.module.css";
import { useState } from "react";

export default function ReviewFilter({
  selectedQuestion,
  setSelectedQuestion,
  selectedRating,
  setSelectedRating,
  setFilterActive,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const getScale = (questionId) => {
    const question = defaultQuestions.find((q) => q.id === questionId);
    return question ? question.scale : { low: "1", high: "5" };
  };

  const getRatingLabel = (rating, scale) => {
    if (rating === 1) return `1 - ${scale.low}`;
    if (rating === 5) return `5 - ${scale.high}`;
    return `${rating}`;
  };

  const scale = getScale(selectedQuestion);

  const handleToggle = () => {
    setShowFilters((prev) => {
      const newState = !prev;
      setFilterActive(newState);
      return newState;
    });
  };

  return (
    <div className={styles.dropDownWrapper}>
      <button className={styles.filterToggleButton} onClick={handleToggle}>
        Filter by Amenity
      </button>

      {showFilters && (
        <div>
          <label className={styles.label}>
            Question:
            <select
              className={styles.select}
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
            >
              {defaultQuestions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.prompt}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Rating:
            <select
              className={styles.select}
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {getRatingLabel(val, scale)}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

ReviewFilter.propTypes = {
  selectedQuestion: PropTypes.string.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  selectedRating: PropTypes.number.isRequired,
  setSelectedRating: PropTypes.func.isRequired,
  setFilterActive: PropTypes.func.isRequired,
};
