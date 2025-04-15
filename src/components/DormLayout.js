import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState } from "react";
import ImageSlideshow from "./images";
import FacilityReview from "./FacilityReview";
import stylesReview from "../styles/FacilityReview.module.css";

export default function DormLayout({ dorm }) {
  const router = useRouter();
  const [activeType, setActiveType] = useState("singles");
  const roomTypes = ["singles", "doubles", "suites"];

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
            <FacilityReview className={stylesReview.FacilityReview} />
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
            <p>⭐️ Placeholder review content for {activeType}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

DormLayout.propTypes = {
  dorm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    building_type: PropTypes.string.isRequired,
    residents: PropTypes.string.isRequired,
  }).isRequired,
};
