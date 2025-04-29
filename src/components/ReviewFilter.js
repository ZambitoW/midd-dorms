/*
ReviewFilter.js
This filters the reviews to look at specific ratings and features.
*/

import PropTypes from "prop-types";
import { defaultQuestions } from "./Reviewer";
import styles from "@/styles/ReviewFilter.module.css";

export default function ReviewFilter({
  selectedQuestion,
  setSelectedQuestion,
  selectedRating,
  setSelectedRating,
}) {
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

  return (
    <div className={styles.reviewFilterContainer}>
      <label className={styles.label}>
        Filter by:
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
        Minimum Rating:
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
  );
}

ReviewFilter.propTypes = {
  selectedQuestion: PropTypes.string.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  selectedRating: PropTypes.number.isRequired,
  setSelectedRating: PropTypes.func.isRequired,
};
