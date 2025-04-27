import React from "react";
import { useState } from "react";
import styles from "@/styles/ProfilePage.module.css";
import PropTypes from "prop-types";

const ReviewTable = ({ reviews }) => {
  const [showFullComments, setShowFullComments] = useState({});

  const toggleComment = (id) => {
    setShowFullComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <table className={styles["review-table"]}>
      <thead>
        <tr>
          <th>Dorm</th>
          <th>Room Type</th>
          <th>Overall Rating</th>
          <th>Comment (Click to Expand)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.Dorm}</td>
            <td>{review.RoomType}</td>
            <td>{review.Rating}</td>
            <td onClick={() => toggleComment(review.id)}>
              <div>
                {showFullComments[review.id]
                  ? review.comment
                  : `${review.comment.slice(0, 50)}...`}
              </div>
            </td>
            <td>{review.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewTable;

ReviewTable.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      Dorm: PropTypes.string.isRequired,
      RoomType: PropTypes.string.isRequired,
      Rating: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
