/*
Reviewer.js

This provides a series of multiple choice questions with limited user selection 
of one and a space for entering additional comments.

specify more here! 

*/

import { useState } from "react";
import PropTypes from "prop-types";

export default function Reviewer({
  dormOptions,
  questions,
  complete,
  initialResponses = {},
  initialComment = "",
}) {
  // state to track answers
  const [responses, setResponses] = useState(initialResponses);
  const [comment, setComment] = useState(initialComment);

  // this function runs when a user selects a number (1-5) for a question
  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  // this function runs when the user clicks "Submit"
  const handleSubmit = () => {
    complete({
      dormOptions,
      responses,
      comment,
    });
  };
  return (
    <div>
      <h2>Rate Your Dorm Experience:</h2>

      {questions.map(
        (
          question, // for each question in array, display question and 1 - 5 rating
        ) => (
          <div key={question.id}>
            <p>
              {question.prompt}
              (1 = {question.scale.low}, 5 = {question.scale.high})
            </p>

            {[1, 2, 3, 4, 5].map(
              (
                num, //loops through the numbers in rating scale
              ) => (
                <label key={num}>
                  <input
                    type="radio" // chooses one answer at a time
                    name={question.id}
                    value={num}
                    checked={responses[question.id] === num}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                  {num}{" "}
                </label>
              ),
            )}
          </div>
        ),
      )}

      {/* comment box */}
      <div>
        <p> Do you have any additional comments?</p>
        <textarea
          rows={4}
          placeholder="Type your thoughts here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* submit button */}
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}

Reviewer.propTypes = {
  dormOptions: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prompt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  complete: PropTypes.func.isRequired,
  initialResponses: PropTypes.object,
  initialComment: PropTypes.string,
};
