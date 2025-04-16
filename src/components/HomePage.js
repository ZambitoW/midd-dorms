import styles from "@/styles/Home.module.css";
import DormList from "@/components/dormList";
import Image from "next/image";
import { useEffect, useState } from "react";
import funFacts from "../../data/funFacts";

function getRandomFacts(facts, count) {
  const shuffled = [...facts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function HomeCreator() {
  const [randomFacts, setRandomFacts] = useState([]);

  useEffect(() => {
    const selectedFacts = getRandomFacts(funFacts, 3);
    setRandomFacts(selectedFacts);
  }, []);
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}> Middlebury College Dorms</h1>

        <section className={styles.mainFacts}>
          <Image
            className={styles.mainImage}
            src="/dormsOverview.jpg"
            alt="Middlebury Dorms"
            width={300}
            height={200}
          />
          <div>
            <div>
              <h4>Fun Facts</h4>
              <ul>
                {randomFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Dorms by Years */}

        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading}>First Year Dorms</h2>
          <DormList dormFilter="first" />
        </section>

        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading}>Second Year Dorms</h2>
          <DormList dormFilter="second" />
        </section>

        <section className={styles.dormSection}>
          <h2 className={styles.dormHeading}>Junior/Senior Year Dorms</h2>
          <DormList dormFilter="junior" />
        </section>
      </main>

      <footer className={styles.footer}>{/* Footer will go here*/}</footer>
    </>
  );
}
