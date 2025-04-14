import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";

export default function DormList({ dormFilter }) {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    fetch("/api/dorms")
      .then((res) => res.json())
      .then((data) => {
        const filteredDorms = data.filter((dorm) => {
          if (dormFilter === "first") return dorm.dorm_id === "battell";
          if (dormFilter === "second") return dorm.dorm_id === "gifford";
          if (dormFilter === "junior") return dorm.dorm_id === "forest"; // or another one later
          return true; // fallback
        });
        setDorms(filteredDorms);
      });
  }, [dormFilter]);

  return (
    <div className={styles.cardGrid}>
      {dorms.map((dorm) => (
        <Link
          key={dorm.dorm_id}
          href={`/dorms/${dorm.dorm_id}`}
          className={styles.dormCard}
        >
          <div>
            <h3>{dorm.name}</h3>
            <p>More info coming soon...</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
DormList.propTypes = {
  dormFilter: PropTypes.string.isRequired,
};
