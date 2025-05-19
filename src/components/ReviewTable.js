import React from "react";
import { useState } from "react";
import styles from "@/styles/ProfilePage.module.css";
import PropTypes from "prop-types";

const ReviewTable = ({ reviews, onDelete, onEdit }) => {
  const [activeReview, setActiveReview] = useState(null);

  return (
    <>
      <table className={styles["review-table"]}>
        <thead>
          <tr>
            <th className={styles.cellLabel}>Dorm</th>
            <th className={styles.cellLabel}>Room Type</th>
            <th className={styles.cellLabel}>Overall Rating</th>
            <th className={styles.cellLabel}>Comment</th>
            <th className={styles.cellLabel}>Date</th>
            <th className={styles.cellLabel}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              onClick={() => setActiveReview(review)}
              className={styles.rowClickable}
            >
              <td>
                <span className={styles.cellValue}>
                  {review.Dorm.charAt(0).toUpperCase() + review.Dorm.slice(1)}
                </span>
              </td>
              <td>
                <span className={styles.cellValue}>
                  {review.RoomType.charAt(0).toUpperCase() +
                    review.RoomType.slice(1)}
                </span>
              </td>
              <td>
                <span className={styles.cellValue}>{review.Rating}</span>
              </td>
              <td>
                <span className={styles.cellValue}>
                  {review.comment.length > 50
                    ? `${review.comment.slice(0, 50)}...`
                    : review.comment}
                </span>
              </td>
              <td>
                <span className={styles.cellValue}>{review.date}</span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <div className={styles.actionButtonGroup}>
                  <button
                    className={styles.tableButton}
                    onClick={() => onEdit(review.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeReview && (
        <div
          className={styles.commentCardOverlay}
          onClick={() => setActiveReview(null)}
        >
          <div
            className={styles.commentCard}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Review Details</h4>
            <p>
              <strong>Dorm:</strong> {activeReview.Dorm}
            </p>
            <p>
              <strong>Room Type:</strong> {activeReview.RoomType}
            </p>
            <p>
              <strong>Rating:</strong> {activeReview.Rating}
            </p>
            <p>
              <strong>Date:</strong> {activeReview.date}
            </p>
            <p>
              <strong>Comment:</strong>
              <br />
              {activeReview.comment}
            </p>
            <div className={styles.modalButtonGroup}>
              <button
                className={styles.tableButton}
                onClick={() => {
                  onEdit(activeReview.id);
                  setActiveReview(null);
                }}
              >
                Edit
              </button>
              <button
                className={styles.tableButton}
                onClick={() => setActiveReview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
