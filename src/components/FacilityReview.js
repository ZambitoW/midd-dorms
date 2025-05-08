import styles from "../styles/FacilityReview.module.css";
import React from "react";
import PropTypes from "prop-types";

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

const FacilityReview = ({ facilityRatings }) => {
  const totalFacilities = Object.keys(facilityRatings).length;

  const avgRating =
    Object.values(facilityRatings).reduce((sum, val) => {
      if (parseFloat(val) === 0) return sum;
      return sum + parseFloat(val);
    }, 0) / totalFacilities;

  const parsedFacilityRatings = parseFacilityRatings(facilityRatings);

  return (
    <div className={styles.reviewSummary}>
      {/* LEFT COLUMN: summary + bars */}
      <div className={styles.left}>
        <div className={styles.average}>{avgRating.toFixed(1)}</div>
        <div className={styles.stars}>★★★★★</div>
        <div className={styles.reviewCount}>{totalFacilities} reviews</div>

        {/* Rating bars */}
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
            <span className={styles.score}>{Number(rating).toFixed(1)}/5</span>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN is not part of this component */}
    </div>
  );
};

export default FacilityReview;

FacilityReview.propTypes = {
  facilityRatings: PropTypes.object.isRequired,
};
