import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ImageSlideshow from "./images";
import FacilityReview from "./FacilityReview";
import stylesReview from "../styles/FacilityReview.module.css";

export default function DormLayout({ dorm }) {
  const router = useRouter();
  const [activeType, setActiveType] = useState("singles");
  const roomTypes = ["singles", "doubles", "suites"];

  const [facilityRatings, setFacilityRatings] = useState({});
  const [reviews, setReviews] = useState({
    singles: [],
    doubles: [],
    suites: [],
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
              singles: [],
              doubles: [],
              suites: [],
            };

            data.forEach((review) => {
              if (review["room_type"] === "single") {
                newReviews.singles.push(review);
              }
              if (review["room_type"] === "double") {
                newReviews.doubles.push(review);
              }
              if (review["room_type"] === "suite") {
                newReviews.suites.push(review);
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
            <p />
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
            <ImageSlideshow className={styles.mainImage} />
          </div>
        </section>

        {/* Room Types Section */}
        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading} style={{ textAlign: "center" }}>
            Room Types
          </h2>
          <div className={styles.roomTypeButtons}>
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

          {/* Dropdown Section */}
          <div className={styles.dropdown}>
            <h4 style={{ marginBottom: "12px" }}>
              {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Reviews
            </h4>
            <ul>
              {reviews[activeType].map((review) => (
                <li key={review.id}>&quot;{review.comment}&quot;</li>
              ))}
            </ul>
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
  }).isRequired,
};
