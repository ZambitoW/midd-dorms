import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
/*import ImageSlideshow from "./images"; **/
import FacilityReview from "./FacilityReview";
import stylesReview from "../styles/FacilityReview.module.css";
import ReviewFilter from "./ReviewFilter";
import { defaultQuestions } from "./Reviewer";
import ImageGallery from "./imageGallery";

export default function DormLayout({ dorm }) {
  const router = useRouter();
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
              if (review["room_type"] === "single") {
                newReviews.single.push(review);
              }
              if (review["room_type"] === "double") {
                newReviews.double.push(review);
              }
              if (review["room_type"] === "suite") {
                newReviews.suite.push(review);
              }
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

  if (!dorm) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>{dorm.name}</h1>

        <section className={styles.mainFacts}>
          <div>
            <p>Type: {dorm.building_type}</p>
            <p>Residents: {dorm.residents}</p>
            <FacilityReview
              className={stylesReview.FacilityReview}
              facilityRatings={facilityRatings}
            />
            <button
              className={styles.secondary}
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </div>

          <div className={styles.mainImage}>
            {dorm && (
              <>
                <p style={{ textAlign: "center", fontStyle: "italic" }}>
                  {dorm.description}
                </p>
                <ImageGallery dormId={dorm.id} />
              </>
            )}
          </div>
        </section>

        {/* Room Types Section */}
        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading} style={{ textAlign: "center" }}>
            Reviews
          </h2>
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
          {/* Dropdown Section */}
          <div className={styles.dropdown}>
            <div className={styles.reviewList}>
              {(activeType
                ? reviews[activeType]
                : [...reviews.single, ...reviews.double, ...reviews.suite]
              )
                .filter(
                  (r) =>
                    !filterActive || r[selectedQuestion] === selectedRating,
                )
                .map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <p className={styles.reviewHeader}>
                      <strong> Sophomore </strong> -{" "}
                      <strong> April 5th, 2025 </strong>
                    </p>
                    <p>{review.comment}</p>
                    <p className={styles.ratings}>
                      Storage: {review.storage_space} &nbsp; Cleanliness:{" "}
                      {review.clean} &nbsp; Noise: {review.noise} &nbsp; Room
                      Size: {review.size} &nbsp; Dining Hall:{" "}
                      {review.dining_hall_proximity} &nbsp; Laundry:{" "}
                      {review.laundry} &nbsp; Bathrooms:{" "}
                      {review.public_bathrooms} &nbsp; Kitchens:{" "}
                      {review.public_kitchens} &nbsp; Athletic Center Proximity:{" "}
                      {review.ac_proximity} &nbsp; Elevators: {review.elevators}{" "}
                      &nbsp;
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading} style={{ textAlign: "center" }}>
            Location on Campus
          </h2>
          <div style={{ width: "100%", height: "500px", marginBottom: "20px" }}>
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
