import styles from "../styles/FacilityReview.module.css";
import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function parseAndCapitalize(str) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseFacilityRatings(facilityRatings) {
  return Object.keys(facilityRatings).reduce((parsedRatings, key) => {
    const parsedKey = parseAndCapitalize(key);
    parsedRatings[parsedKey] = facilityRatings[key];
    return parsedRatings;
  }, {});
}

const FacilityReview = ({ facilityRatings, numReviews }) => {
  const totalFacilities = Object.keys(facilityRatings).length;
  const avgRating =
    Object.values(facilityRatings).reduce((sum, val) => {
      if (parseFloat(val) === 0) {
        return sum;
      }
      return sum + parseFloat(val);
    }, 0) / totalFacilities;

  const parsedFacilityRatings = parseFacilityRatings(facilityRatings);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const fractionalPart = rating - fullStars;
    const partialStarWidth = Math.round(fractionalPart * 10) * 10;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div>
        {Array.from({ length: fullStars }, () => ({
          id: nanoid(),
        })).map((star) => (
          <span
            key={star.id}
            className={styles.stars}
            style={{ "--my-color": "#FFD700" }}
          >
            ★
          </span>
        ))}

        {fractionalPart > 0 && (
          <span
            className={styles.partialStar}
            style={{
              "--partial-width": `${partialStarWidth}%`,
            }}
          >
            ★
          </span>
        )}

        {Array.from({ length: emptyStars }, () => ({
          id: nanoid(),
        })).map((star) => (
          <span
            key={star.id}
            className={styles.stars}
            style={{ "--my-color": "#eeeeee" }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.reviewSummary}>
      <div className={styles.left}>
        {Object.entries(parsedFacilityRatings).map(([facility, rating]) => (
          <div className={styles.ratingRow} key={facility}>
            <span className={styles.label}>{facility}</span>
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(rating / 5) * 100}%`,
                }}
              />
            </div>
            <span className={styles.score}>{rating}/5</span>
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.average}>{avgRating.toFixed(1)}</div>
        <div className={styles.stars}>{renderStars(avgRating)}</div>
        <div className={styles.reviewCount}>{numReviews} reviews</div>
      </div>
    </div>
  );
};

export default FacilityReview;

FacilityReview.propTypes = {
  facilityRatings: PropTypes.object.isRequired,
  numReviews: PropTypes.number.isRequired,
};
