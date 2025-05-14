import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ImageGallery from "./imageGallery";
import FacilityReview from "./FacilityReview";
import stylesReview from "../styles/FacilityReview.module.css";
import ReviewFilter from "./ReviewFilter";
import { defaultQuestions } from "./Reviewer";
import Dormstyles from "../styles/DormLayout.module.css";

export default function DormLayout({ dorm }) {
  const [activeType, setActiveType] = useState(null);
  const { roomTypes } = dorm;
  const [selectedQuestion, setSelectedQuestion] = useState(
    defaultQuestions[0].id,
  );
  const [selectedRating, setSelectedRating] = useState(1);
  const [facilityRatings, setFacilityRatings] = useState({});
  const [filterActive, setFilterActive] = useState(false);
  const [reviews, setReviews] = useState({
    single: [],
    double: [],
    suite: [],
  });

  useEffect(() => {
    const categories = [
      "storage_space",
      "clean",
      "noise",
      "size",
      "dining_hall_proximity",
      "laundry",
      "public_bathrooms",
      "public_kitchens",
      "ac_proximity",
      "elevators",
    ];
    const fetchReviews = async () => {
      if (dorm) {
        try {
          const response = await fetch(`/api/dorms/${dorm.id}/reviews`);
          if (response.ok) {
            const data = await response.json();
            categories.forEach((category) => {
              let sum = 0;
              let count = 0;
              data.forEach((review) => {
                if (review[category] !== 0) {
                  sum += review[category];
                  count++;
                }
              });
              const average = count > 0 ? (sum / count).toFixed(1) : 0;
              setFacilityRatings((prevRatings) => ({
                ...prevRatings,
                [category]: average,
              }));
            });

            const newReviews = {
              single: [],
              double: [],
              suite: [],
            };

            data.forEach((review) => {
              if (review.room_type === "single") newReviews.single.push(review);
              if (review.room_type === "double") newReviews.double.push(review);
              if (review.room_type === "suite") newReviews.suite.push(review);
            });

            setReviews(newReviews);
          } else {
            console.error("Failed to fetch reviews:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };
    fetchReviews();
  }, [dorm]);

  const reviewsRef = useRef(null);

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!dorm) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Updated title using Dormstyles */}
        <h1 className={`${styles.title} ${Dormstyles.title}`}>{dorm.name}</h1>

        <section className={styles.mainFacts}>
          <div>
            <FacilityReview
              className={stylesReview.FacilityReview}
              facilityRatings={facilityRatings}
              numReviews={Object.values(reviews).reduce(
                (acc, arr) => acc + arr.length,
                0,
              )}
              onScrollToReviews={scrollToReviews}
            />
          </div>

          <div className={Dormstyles.descriptionAndImages}>
            <p className={Dormstyles.description}>{dorm.description}</p>
            <div className={Dormstyles.imageGallery}>
              <ImageGallery dormId={dorm.id} />
            </div>
          </div>
        </section>

        {/* Reviews Section */}

        <section className={Dormstyles.reviewAndMapSection}>
          <div className={Dormstyles.leftColumn}>
            <h2 className={styles.dormHeading}>Reviews</h2>

            <div className={styles.roomTypeButtons}>
              <button
                key="all"
                className={`${styles.secondary} ${!activeType ? styles.roomTypeButtonActive : ""}`}
                onClick={() => setActiveType(null)}
              >
                All
              </button>
              {roomTypes.map((type) => (
                <button
                  key={type}
                  className={`${styles.secondary} ${activeType === type ? styles.roomTypeButtonActive : ""}`}
                  onClick={() => setActiveType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <ReviewFilter
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              setFilterActive={setFilterActive}
            />

            {/* <div className={styles.dropdown}> */}
            <div className={styles.reviewList} style={{ marginTop: "12px" }}>
              {(activeType
                ? reviews[activeType]
                : [...reviews.single, ...reviews.double, ...reviews.suite]
              )
                .filter(
                  (r) =>
                    !filterActive || r[selectedQuestion] === selectedRating,
                )
                .map((review) => (
                  <Card
                    key={review.id}
                    variant="outlined"
                    sx={{
                      marginBottom: "16px",
                      borderRadius: "12px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        <strong>Anonymous</strong> –{" "}
                        <strong>{review.date}</strong>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {review.comment}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Storage: {review.storage_space} &nbsp; Cleanliness:{" "}
                        {review.clean} &nbsp; Noise: {review.noise} &nbsp; Room
                        Size: {review.size} &nbsp; Dining Hall:{" "}
                        {review.dining_hall_proximity} &nbsp; Laundry:{" "}
                        {review.laundry} &nbsp; Bathrooms:{" "}
                        {review.public_bathrooms} &nbsp; Kitchens:{" "}
                        {review.public_kitchens} &nbsp; Athletic Center
                        Proximity: {review.ac_proximity} &nbsp; Elevators:{" "}
                        {review.elevators}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Map Section */}
          <div className={Dormstyles.rightColumn}>
            <div className={Dormstyles.stickyMapWrapper}>
              <h2
                className={styles.dormHeading}
                style={{ textAlign: "center" }}
              >
                Location on Campus
              </h2>
              <div className={Dormstyles.mapBox}>
                <iframe
                  src={
                    dorm.mapId
                      ? `https://map.middlebury.edu/?id=229#!ce/50703?ct/68812,68815,68816?m/${dorm.mapId}?s/`
                      : `https://map.middlebury.edu/?id=229`
                  }
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  loading="lazy"
                  allowFullScreen
                  title="Middlebury Dorm Map"
                />
              </div>
              {!dorm.mapId && (
                <p style={{ textAlign: "center", fontStyle: "italic" }}>
                  Specific map location not yet linked to this dorm
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

DormLayout.propTypes = {
  dorm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    building_type: PropTypes.string.isRequired,
    residents: PropTypes.string.isRequired,
    mapId: PropTypes.string,
    description: PropTypes.string,
    roomTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
