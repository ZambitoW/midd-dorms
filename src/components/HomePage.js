import styles from "@/styles/Home.module.css";
import DormList from "@/components/dormList";
import Image from "next/image";

export default function HomeCreator() {
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
            <p>
              🏫 Did you know Battell is said to be turned into a museum, once
              the new dorm opens? Giffords 5th floor lounge has amazing sunset
              views! 🌲 Forest has personal sinks adjoining two single
              rooms.{" "}
            </p>
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
