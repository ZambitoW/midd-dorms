import styles from "@/styles/Home.module.css";
import DormList from "@/components/dormList";
import { useEffect, useState, useRef } from "react";
import funFacts from "../../data/funFacts";
import FilterBar from "./filterBar";

function getRandomFacts(facts, count) {
  const shuffled = [...facts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomeCreator() {
  const [randomFacts, setRandomFacts] = useState([]);
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

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

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <>
      <main className={styles.main}>
        {/* Top Section */}

        <div className={styles.heroSection}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
          >
            <source src="/middleburyDrone.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className={styles.videoControl} onClick={toggleVideoPlayback}>
            {isPaused ? (
              <div className={styles.playIcon} />
            ) : (
              <div className={styles.pauseIcon}>
                <div />
                <div />
              </div>
            )}
          </button>

          <div className={styles.heroCardCombined}>
            <h1 className={styles.heroTitle}>Middlebury College Dorms</h1>
            <div className={styles.factsCard}>
              <h4>Fun Facts</h4>
              <ul>
                {randomFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <div className={styles.scrollHint}>↓ Scroll to explore</div>
          </div>
        </div>

        {/* Bottom Section: Dorms by Years */}

        <div className={styles.bottomSection}>
          <div className={styles.dormContentWrapper}>
            <div className={styles.mainContent}>
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
            <div className={styles.floatingFilterPanel}>
              <p>Filter By</p>
              <FilterBar
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
