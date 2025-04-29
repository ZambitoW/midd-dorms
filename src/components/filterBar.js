import styles from "@/styles/Home.module.css";
import PropTypes from "prop-types";

export const filters = {
  roomTypes: [
    { label: "🛏️ Singles", value: "single" },
    { label: "🧑‍🤝‍🧑 Doubles", value: "double" },
    { label: "👥 Triples", value: "triple" },
    { label: "🏡 Suites", value: "suite" },
  ],
  amenities: [
    { label: "🧺 Laundry", value: "laundry" },
    { label: "🧑‍🍳 Kitchen", value: "kitchen" },
    { label: "🛗 Elevator", value: "elevator" },
  ],
  accessibility: [],
};

export default function FilterBar({ activeFilters, toggleFilter }) {
  return (
    <div className={styles.filterBar}>
      {Object.entries(filters).map(([category, options]) =>
        options.map(({ label, value }) => {
          const isActive = activeFilters[category]?.includes(value);
          return (
            <div
              key={label}
              onClick={() => toggleFilter(category, value)}
              className={`${styles.filterItem} ${isActive ? styles.active : ""}`}
            >
              <div className={styles.emoji}>{label.split(" ")[0]}</div>
              <div className={styles.label}>
                {label.split(" ").slice(1).join(" ")}
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}

FilterBar.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
