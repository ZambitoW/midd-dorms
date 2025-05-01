import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function DormList({ dormFilter, filters = {} }) {
  const [dorms, setDorms] = useState([]);

  const matchesCategoryFilters = (dorm, selectedFilters) => {
    return Object.entries(selectedFilters).every(
      ([category, selectedOptions]) => {
        if (selectedOptions.length === 0) return true;

        const dormValues =
          dorm[category]?.map((val) => val.toLowerCase()) || [];

        return selectedOptions.every((opt) =>
          dormValues.includes(opt.toLowerCase()),
        );
      },
    );
  };

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await fetch("/api/dorms");
        if (response.ok) {
          const data = await response.json();

          const noFilterActive = Object.values(filters).every(
            (arr) => arr.length === 0,
          );

          const filteredDorms = data.filter((dorm) => {
            let matchesYear = true;
            if (dormFilter === "first") {
              matchesYear = dorm.category.toLowerCase().includes("freshman");
            }
            if (dormFilter === "second") {
              matchesYear = dorm.category.toLowerCase().includes("sophomore");
            }
            if (dormFilter === "junior") {
              matchesYear = dorm.category.toLowerCase().includes("upper");
            } // or another one later

            const matchesFilters = matchesCategoryFilters(dorm, filters);
            return matchesYear && (noFilterActive || matchesFilters);
          });
          setDorms(filteredDorms);
          console.log("filters:", filters);
          console.log("filteredDorms:", filteredDorms);
        } else {
          console.error("Failed to fetch dorms:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dorms data:", error);
      }
    };
    fetchDorms();
  }, [dormFilter, filters]);

  return (
    <div className={styles.cardGrid}>
      {dorms.length === 0 ? (
        <p>No dorms found.</p>
      ) : (
        dorms.map((dorm) => (
          <Link
            key={dorm.id}
            href={`/dorms/${dorm.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              className={styles.dormCard}
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 2,
                overflow: "hidden",
                margin: 2,
              }}
            >
              <CardMedia
                component="img"
                alt={dorm.name}
                height="140"
                image={`/dormImages/${dorm.id}.jpg`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dorm.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${dorm.description.split(" ").slice(0, 20).join(" ")}...`}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
DormList.propTypes = {
  dormFilter: PropTypes.string.isRequired,
  filters: PropTypes.object,
};
