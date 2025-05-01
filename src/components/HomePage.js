import styles from "@/styles/Home.module.css";
import DormList from "@/components/dormList";
import { useEffect, useState } from "react";
import funFacts from "../../data/funFacts";
import FilterBar from "./filterBar";

function getRandomFacts(facts, count) {
  const shuffled = [...facts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomeCreator() {
  const [randomFacts, setRandomFacts] = useState([]);

  const [activeFilters, setActiveFilters] = useState({
    roomTypes: [],
    amenities: [],
    accessibility: [],
  });

  useEffect(() => {
    const selectedFacts = getRandomFacts(funFacts, 4);
    setRandomFacts(selectedFacts);
  }, []);

  const toggleFilter = (category, value) => {
    console.log("Toggling Filter:", category, value);

    setActiveFilters((prev) => {
      const val = value.toLowerCase();
      const isActive = prev[category].includes(val);
      return {
        ...prev,
        [category]: isActive
          ? prev[category].filter((v) => v !== val)
          : [...prev[category], val],
      };
    });
  };

  return (
    <>
      <main className={styles.main}>
        {/* Top Section */}
        <h1 className={styles.title}> Middlebury College Dorms</h1>

        <div className={styles.topSection}>
          <div className={styles.image} />
          <div className={styles.mainContent}>
            <section className={styles.mainFacts}>
              <div>
                <h4>Fun Facts</h4>
                <ul>
                  {randomFacts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className={styles.floatingFilterPanel}>
            <p>Filter By</p>
            <FilterBar
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
            />
          </div>
        </div>

        {/* Bottom Section: Dorms by Years */}

        <div className={styles.bottomSection}>
          <section className={styles.dormSection}>
            <h2 className={styles.dormHeading}>First Year Dorms</h2>
            <DormList dormFilter="first" filters={activeFilters} />
          </section>

          <section className={styles.dormSection}>
            <h2 className={styles.dormHeading}>Second Year Dorms</h2>
            <DormList dormFilter="second" filters={activeFilters} />
          </section>

          <section className={styles.dormSection}>
            <h2 className={styles.dormHeading}>Junior/Senior Year Dorms</h2>
            <DormList dormFilter="junior" filters={activeFilters} />
          </section>
        </div>
      </main>

      <footer className={styles.footer}>{/* Footer will go here*/}</footer>
    </>
  );
}
