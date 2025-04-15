import styles from "../styles/FacilityReview.module.css";
import React from "react";

const facilityRatings = {
  Bathrooms: 5,
  Laundry: 3,
  Kitchens: 5,
  Trash: 5,
  "Water Fountains": 1,
};

const FacilityReview = () => {
  const totalFacilities = Object.keys(facilityRatings).length;
  const avgRating =
    Object.values(facilityRatings).reduce((sum, val) => sum + val, 0) /
    totalFacilities;

  return (
    <div className={styles.reviewSummary}>
      <div className={styles.left}>
        {Object.entries(facilityRatings).map(([facility, rating]) => (
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
        <div className={styles.stars}>★★★★★</div>
        <div className={styles.reviewCount}>{totalFacilities} reviews</div>
      </div>
    </div>
  );
};

export default FacilityReview;
